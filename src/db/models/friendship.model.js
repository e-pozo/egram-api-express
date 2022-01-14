const { Model, DataTypes } = require('sequelize');
const commonFields = require('./utils/commonFields');
const { USER_TABLE } = require('./user.model');
const FRIENDSHIP_TABLE = 'friendships';

const friendshipSchema = {
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  friendId: commonFields
    .foreign('friend_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'REQUEST',
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
};

class Friendship extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: FRIENDSHIP_TABLE,
      modelName: 'Friendship',
      timestamps: true,
    };
  }
}

module.exports = {
  Friendship,
  friendshipSchema,
  FRIENDSHIP_TABLE,
};
