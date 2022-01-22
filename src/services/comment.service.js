import sequelize from '../libs/sequelize';
import { userService } from './user.service';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const Comment = sequelize.models.Comment;
const CommentLike = sequelize.models.CommentLike;
const CRUDService = CRUDServiceClosure(Comment);
class CommentService extends CRUDService {}
export const commentService = new CommentService();
