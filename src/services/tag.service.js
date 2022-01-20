import sequelize from '../libs/sequelize';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
import { userService } from './user.service';
import boom from '@hapi/boom';
import req from 'express/lib/request';
const Tag = sequelize.models.Tag;
const CRUDService = CRUDServiceClosure(Tag);
class TagService extends CRUDService {
  async userTags(userId) {
    const user = await userService.findOne(userId);
    const tags = await user.getTags();
    return tags;
  }
}

export const tagService = new TagService();

//AUTHORIZATION MIDDLEWARE

export async function onlyCreator(
  { user: { sub }, params: { id } },
  _res,
  next
) {
  const [user, tag] = await Promise.all([
    userService.findOne(sub),
    tagService.findOne(id),
  ]);
  const hasTag = await user.hasTag(tag);
  if (hasTag) {
    next();
  } else {
    next(boom.forbidden('resource forbidden'));
  }
}
