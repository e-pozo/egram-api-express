import sequelize from '../libs/sequelize';
import { roleService } from './role.service';
const User = sequelize.models.User;

class UserService {
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
}

export const userService = new UserService();
