import boom from '@hapi/boom';
import sequelize from '../libs/sequelize';
import { roleService } from './role.service';
import { CRUDServiceClosure } from './utils/CRUDServiceClosure';
const User = sequelize.models.User;
const CRUDService = CRUDServiceClosure(User);
class UserService extends CRUDService {
  async create(data) {
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

  async findByEmail(email) {
    const user = await User.findOne({ where: { email }, include: ['roles'] });
    if (!user) throw boom.notFound('user not found');
    return user;
  }
}

export const userService = new UserService();
