const { Model, DataTypes } = require('sequelize');
const commonFields = require('./utils/commonFields');
const ROLE_TABLE = 'roles';
const roleSchema = {
  id: commonFields.id,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
};

class Role extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'users',
      through: models.Permission,
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false,
    };
  }
}

module.exports = { Role, roleSchema, ROLE_TABLE };
