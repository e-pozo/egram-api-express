import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const Like = sequelize.models.Like;
const CRUDService = CRUDServiceClosure(Like);

class LikeService extends CRUDService {
  async findByForeignKeys(userId, mediaContentId) {
    const like = Like.findOne({ where: { userId, mediaContentId } });
    if (!like) throw boom.notFound('Like not found');
    return like;
  }
}

export const likeService = new LikeService();
