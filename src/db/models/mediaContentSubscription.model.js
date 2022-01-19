const { Model, DataTypes } = require('sequelize');
const commonFields = require('./utils/commonFields');
const { MEDIA_CONTENT_TABLE } = require('./mediaContent.model');
const { USER_TABLE } = require('./user.model');
const MEDIA_CONTENT_SUBSCRIPTION_TABLE = 'media_content_subcriptions';

const mediaContentSubscriptionSchema = {
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

class MediaContentSubscription extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'MediaContentSubscription',
      tableName: MEDIA_CONTENT_SUBSCRIPTION_TABLE,
      timestamps: true,
    };
  }
}

module.exports = {
  MEDIA_CONTENT_SUBSCRIPTION_TABLE,
  mediaContentSubscriptionSchema,
  MediaContentSubscription,
};
