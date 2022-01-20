import sequelize from '../libs/sequelize';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
import { userService } from './user.service';
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
