const { Model } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { ROLE_TABLE } = require('./role.model');
const commonFields = require('./utils/commonFields');
const PERMISSION_TABLE = 'permissions';

const permissionSchema = {
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  roleId: commonFields
    .foreign('role_id', ROLE_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
};

class Permission extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PERMISSION_TABLE,
      modelName: 'Permission',
      timestamps: true,
    };
  }
}

module.exports = {
  Permission,
  permissionSchema,
  PERMISSION_TABLE,
};
