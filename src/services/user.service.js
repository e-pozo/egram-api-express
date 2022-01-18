import boom from '@hapi/boom';
import sequelize from '../libs/sequelize';
import { roleService } from './role.service';
import { friendshipService } from './friendship.service';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
import { DEFAULT_PAG_LIMIT, DEFAULT_PAG_OFFSET } from './utils/constants';
const User = sequelize.models.User;
const CRUDService = CRUDServiceClosure(User);
class UserService extends CRUDService {
  async createUser(data) {
    const t = await sequelize.transaction();
    const role = await roleService.findByRole('USER');
    try {
      const user = await User.create(data, { transaction: t });
      await user.addRole(role, { transaction: t });
      await t.commit();
      return user;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async create(data) {
    const t = await sequelize.transaction();
    const role = await sequelize.findByRole(data.role);
    delete data.role;
    try {
      const user = await User.create(data, { transaction: t });
      await user.addRole(role, { transaction: t });
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async findByEmail(email) {
    const user = await User.findOne({ where: { email }, include: ['roles'] });
    if (!user) throw boom.notFound('user not found');
    return user;
  }

  async findByUserName(userName) {
    const user = await User.findOne({ where: { userName } });
    if (!user) throw boom.notFound('user not found');
    return user;
  }

  async findOne(id) {
    const user = await User.findByPk(id, { include: ['roles'] });
    if (!user) throw boom.notFound('user not Found');
    return user;
  }

  async friends(
    userId,
    status,
    { offset = DEFAULT_PAG_OFFSET, limit = DEFAULT_PAG_LIMIT } = {
      offset: DEFAULT_PAG_OFFSET,
      limit: DEFAULT_PAG_OFFSET,
    }
  ) {
    const user = await User.findByPk(userId, {
      include: {
        association: 'friends',
        offset,
        limit,
        through: {
          where: { status },
        },
      },
    });
    if (!user) throw boom.notFound('user not found');
    user.friends.map((friend) => {
      delete friend.dataValues.password;
      delete friend.dataValues.recoveryToken;
      return friend;
    });
    return user.friends;
  }

  async friendReceivedRequests(
    userId,
    { offset = DEFAULT_PAG_OFFSET, limit = DEFAULT_PAG_LIMIT } = {
      offset: DEFAULT_PAG_OFFSET,
      limit: DEFAULT_PAG_LIMIT,
    }
  ) {
    const user = await User.findByPk(userId);
    if (!user) throw boom.notFound('user not found');
    const requests = await user.getFriends({
      through: { where: { status: 'REQUEST_RECEIVED' } },
      limit,
      offset,
    });
    requests.map((req) => {
      delete req.dataValues.password;
      delete req.dataValues.recoveryToken;
      return req;
    });
    return requests;
  }

  async friendSentRequests(
    userId,
    { offset = DEFAULT_PAG_OFFSET, limit = DEFAULT_PAG_LIMIT } = {
      offset: DEFAULT_PAG_OFFSET,
      limit: DEFAULT_PAG_LIMIT,
    }
  ) {
    const user = await User.findByPk(userId);
    if (!user) throw boom.notFound('user not found');
    const requests = await user.getFriends({
      through: { where: { status: 'REQUEST_SENT' } },
      limit,
      offset,
    });
    requests.map((req) => {
      delete req.dataValues.password;
      delete req.dataValues.recoveryToken;
      return req;
    });
    return requests;
  }

  async createFriendRequest(userId, friendId) {
    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);
    if (!user) throw boom.notFound('user not found');
    if (!friend) throw boom.notFound('friend not found');
    const t = await sequelize.transaction();
    try {
      await user.addFriends(friend, {
        through: { status: 'REQUEST_SENT' },
        transaction: t,
      });
      await friend.addFriends(user, {
        through: { status: 'REQUEST_RECEIVED' },
        transaction: t,
      });
      await t.commit();
      return user;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async updateStatusRelationship(relationshipId, newStatus) {
    const friendship1 = await friendshipService.findOne(relationshipId);
    if (!friendship1) throw boom.notFound('friendship not found');
    const friendship2 = await friendshipService.findByForeingKeys(
      friendship1.friendId,
      friendship1.userId
    );
    if (!friendship2) throw boom.notFound('friendship not found');
    const t = await sequelize.transaction();
    try {
      const friendship = await friendshipService.update(
        friendship1.id,
        { status: newStatus },
        { transaction: t }
      );
      await friendshipService.update(
        friendship2.id,
        { status: newStatus },
        { transaction: t }
      );
      await t.commit();
      return friendship;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
  async acceptFriendRequest(friendshipId) {
    const friendship = await this.updateStatusRelationship(
      friendshipId,
      'ACCEPTED'
    );
    return friendship;
  }

  async breakFriendship(friendshipId) {
    const friendship = await this.updateStatusRelationship(
      friendshipId,
      'BROKEN'
    );
    return friendship;
  }
}

export const userService = new UserService();
