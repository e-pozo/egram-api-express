import sequelize from '../libs/sequelize';
import boom from '@hapi/boom';
const Role = sequelize.models.Role;
class RoleService {
  async create(roleName) {
    const role = await Role.create({ role: roleName });
    return role;
  }
  async getAll({ offset = 0, limit = 20 }) {
    const roles = await Role.findAll({ offset, limit });
    return roles;
  }
  async get(id) {
    const role = await Role.findByPk(id);
    if (!role) throw boom.notFound('role not found');
    return role;
  }
  async findByRole(roleName) {
    const role = await Role.findOne({ where: { role: roleName } });
    if (!role) throw boom.notFound('role not found');
    return role;
  }
  async update(id, changes) {
    let role = await this.get(id);
    role = role.update(changes);
    return role;
  }
  async delete(id) {
    const role = this.find(id);
    await role.destroy();
    return role;
  }
}

export const roleService = new RoleService();
