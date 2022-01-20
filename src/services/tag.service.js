import sequelize from '../libs/sequelize';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const Tag = sequelize.models.Tag;
const CRUDService = CRUDServiceClosure(Tag);
class TagService extends CRUDService {}

export const tagService = new TagService();
