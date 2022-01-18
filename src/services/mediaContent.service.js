import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
import { uploadFileS3, deleteFileS3 } from '../libs/s3';
import util from 'util';
import fs from 'fs';
import { userService } from './user.service';
import { DEFAULT_PAG_LIMIT, DEFAULT_PAG_OFFSET } from './utils/constants';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const unlinkFile = util.promisify(fs.unlink);
const MediaContent = sequelize.models.MediaContent;
const CRUDService = CRUDServiceClosure(MediaContent);
class MediaContentService extends CRUDService {
  async create(userId, data, file) {
    try {
      const user = await userService.findOne(userId);
      const mediaContent = await user.createContentCreation({
        ...data,
        mediaKey: file.filename,
      });
      // const mediaContent = await MediaContent.create({
      //   ...data,
      //   mediaKey: file.filename,
      // });
      await uploadFileS3(file);
      return mediaContent;
    } catch (err) {
      throw err;
    } finally {
      await unlinkFile(file.path);
    }
  }
  async userMediaContents(
    userId,
    { offset = DEFAULT_PAG_OFFSET, limit = DEFAULT_PAG_LIMIT } = {
      offset: DEFAULT_PAG_OFFSET,
      limit: DEFAULT_PAG_LIMIT,
    }
  ) {
    const user = await userService.findOne(userId);
    const userCreations = await user.getContentCreations({ offset, limit });
    return userCreations;
  }

  async userAccess(contentId, userId) {
    const mediaContent = await MediaContent.findByPk(contentId, {
      include: ['creator'],
    });
    if (!mediaContent) throw boom.notFound('media content not found');
    if (mediaContent.creator.id === userId) return mediaContent;
    if (mediaContent.accessStatus === 'PUBLIC') return mediaContent;
    const friends = userService.friends(mediaContent.creator.id);
    throw boom.forbidden('forbidden resource');
  }
  async findByKey(key) {
    const mediaContent = await MediaContent.findOne({
      where: { mediaKey: key },
    });
    if (!mediaContent) throw boom.notFound('media content not found');
    return mediaContent;
  }

  async delete(id) {
    const mediaContent = await this.findOne(id);
    await deleteFileS3(mediaContent.mediaKey);
    await mediaContent.destroy();
    return { id };
  }
}

export const mediaContentService = new MediaContentService();

//AUTHORIZATION MIDDLEWARE
export async function checkMediaContentAuthorization(
  { params: { id, key }, user: { sub } },
  _res,
  next
) {
  try {
    let responses;
    if (!id) {
      responses = await Promise.all([
        userService.findOne(sub),
        mediaContentService.findByKey(key),
      ]);
    } else {
      responses = await Promise.all([
        userService.findOne(sub),
        mediaContentService.findOne(id),
      ]);
    }
    const [user, mediaContent] = responses;
    if (await user.hasContentCreation(mediaContent)) return next();
    if (mediaContent.accessStatus == 'FRIENDS') {
      const creator = await mediaContent.getCreator();
      if (
        await creator.hasFriend(user, {
          through: { where: { status: 'ACCEPTED' } },
        })
      )
        return next();
    }
    if (mediaContent.accessStatus == 'PUBLIC') return next();
    next(boom.forbidden('resource forbbiden'));
  } catch (err) {
    next(err);
  }
}

export async function checkOnlyCreator(
  { params: { id }, user: { sub } },
  _res,
  next
) {
  try {
    const [user, mediaContent] = await Promise.all([
      userService.findOne(sub),
      mediaContentService.findOne(id),
    ]);
    if (await user.hasContentCreation(mediaContent)) return next();
    next(boom.forbidden('resource forbbiden'));
  } catch (err) {
    next(err);
  }
}
