const { Model, DataTypes } = require('sequelize');
const commonFields = require('./utils/commonFields');
const { MEDIA_CONTENT_TABLE } = require('./mediaContent.model');
const { USER_TABLE } = require('./user.model');
const LIKE_TABLE = 'likes';

const likeSchema = {
  id: commonFields.id,
  mediaContentId: commonFields
    .foreign('media_content_id', MEDIA_CONTENT_TABLE, 'id')
    .add({ unique: 'composite', onDelete: 'CASCADE' }),
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ unique: 'composite', onDelete: 'CASCADE' }),
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
};

class Like extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Like',
      tableName: LIKE_TABLE,
      timestamps: true,
    };
  }
}

module.exports = {
  LIKE_TABLE,
  likeSchema,
  Like,
};
