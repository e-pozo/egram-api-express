import sequelize from '../libs/sequelize';
import { Op } from 'sequelize';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
import { userService } from './user.service';
import { mediaContentService } from './mediaContent.service';
import boom from '@hapi/boom';
const Tag = sequelize.models.Tag;
const CRUDService = CRUDServiceClosure(Tag);
class TagService extends CRUDService {
  async userTags(userId) {
    const user = await userService.findOne(userId);
    const tags = await user.getTags();
    return tags;
  }

  async detail(tagId, userId) {
    const [user, tag] = await Promise.all([
      userService.findOne(userId),
      this.findOne(tagId),
    ]);
    const accessList = ['PUBLIC'];
    const creator = await tag.getCreator();
    const isFriend = await creator.hasFriend(user);
    const isCreator = creator.id == userId;
    if (isFriend || isCreator) accessList.push('FRIENDS');
    if (isCreator) accessList.push('PRIVATE');
    const mediaContents = await tag.getMediaContents({
      where: { accessStatus: { [Op.or]: accessList } },
    });
    tag.dataValues.mediaContents = mediaContents;
    return tag;
  }

  async addContent(tagId, contentId) {
    const [tag, mediaContent] = await Promise.all([
      this.findOne(tagId),
      mediaContentService.findOne(contentId),
    ]);
    const tagRelation = await tag.addMediaContent(mediaContent);
    return tagRelation;
  }

  async removeContent(tagId, contentId) {
    const [tag, mediaContent] = await Promise.all([
      this.findOne(tagId),
      mediaContentService.findOne(contentId),
    ]);
    const tagRelation = await tag.removeMediaContent(mediaContent);
    return tagRelation;
  }
}

export const tagService = new TagService();

//AUTHORIZATION MIDDLEWARE

export function onlyCreatorClosure(idExtractor) {
  return async (req, _res, next) => {
    const [userId, tagId] = idExtractor(req);
    const [user, tag] = await Promise.all([
      userService.findOne(userId),
      tagService.findOne(tagId),
    ]);
    const hasTag = await user.hasTag(tag);
    if (hasTag) {
      next();
    } else {
      next(boom.forbidden('resource forbidden'));
    }
  };
}
