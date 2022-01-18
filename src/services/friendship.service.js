import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const Friendship = sequelize.models.Friendship;
const CRUDService = CRUDServiceClosure(Friendship);

class FriendshipService extends CRUDService {
  // async areFriends(userId1, userId2){
  //   const friendship = Friendship.findOne({where: })
  // }
  async establishFriendship(userId1, userId2) {
    const relationship1 = await Friendship.findOne({
      where: { userId: userId1, friendId: userId2 },
    });
    const relationship2 = await Friendship.findOne({
      where: { userId: userId2, friendId: userId1 },
    });
    if (!relationship1 || !relationship2)
      throw boom.notFound('Friendship not found');
    const t = await sequelize.transaction();
    try {
      await relationship1.update({ status: 'ACCEPTED' }, { transaction: t });
      await relationship2.update({ status: 'ACCEPTED' }, { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
  async findByForeingKeys(userId, friendId) {
    const relationship = await Friendship.findOne({
      where: { userId, friendId },
    });
    if (!relationship) throw boom.notFound('friendship not found');
    return relationship;
  }
}

export const friendshipService = new FriendshipService();

//AUTHORIZATION MIDDLEWARES
export async function checkAuthorizationOnAcceptFriend(
  { params: { id }, user: { sub } },
  _res,
  next
) {
  try {
    const friendship = await friendshipService.findOne(id);
    if (friendship.userId != sub) throw boom.forbidden('forbidden resource');
    next();
  } catch (err) {
    next(err);
  }
}

export async function checkAuthorizationOnBreakFriend(
  { params: { id }, user: { sub } },
  _res,
  next
) {
  try {
    const friendship = await friendshipService.findOne(id);
    if (friendship.userId == sub || friendship.friendId == sub) next();
    else {
      throw boom.forbidden('forbidden resource');
    }
  } catch (err) {
    next(err);
  }
}
