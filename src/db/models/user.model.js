const { Model, DataTypes } = require('sequelize');
const commonFields = require('./utils/commonFields');
const { hash } = require('../../auth/hash');
const USER_TABLE = 'users';
const userSchema = {
  id: commonFields.id,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recoveryToken: {
    type: DataTypes.STRING,
    field: 'recovery_token',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'user_name',
  },
  nickName: {
    type: DataTypes.STRING,
    field: 'nick_name',
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
};

class User extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'friends',
      through: models.Friendship,
      foreignKey: 'userId',
      otherKey: 'friendId',
    });
    this.belongsToMany(models.Role, {
      as: 'roles',
      through: models.Permission,
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
    this.hasMany(models.MediaContent, {
      as: 'contentCreations',
      foreignKey: 'creatorId',
    });
  }
  static hookConf() {
    this.beforeCreate('hashPassword', async (user, _options) => {
      const hashedPassword = await hash(user.password);
      user.password = hashedPassword;
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
    };
  }
}

module.exports = { User, userSchema, USER_TABLE };
