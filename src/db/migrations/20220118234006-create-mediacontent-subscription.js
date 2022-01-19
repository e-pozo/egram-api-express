'use strict';
const commonFields = require('../models/utils/commonFields');
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
const {
  MEDIA_CONTENT_SUBSCRIPTION_TABLE,
} = require('../models/mediaContentSubscription.model');
const { USER_TABLE } = require('../models/user.model');
const mediaContentSubscriptionSchema = (DataTypes) => ({
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
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      MEDIA_CONTENT_SUBSCRIPTION_TABLE,
      mediaContentSubscriptionSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(MEDIA_CONTENT_SUBSCRIPTION_TABLE);
  },
};
