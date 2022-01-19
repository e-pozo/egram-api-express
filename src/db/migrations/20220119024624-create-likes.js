'use strict';
const { LIKE_TABLE } = require('../models/like.model');
const { USER_TABLE } = require('../models/user.model');
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
const commonFields = require('../models/utils/commonFields');
const likeSchema = (DataTypes) => ({
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
      LIKE_TABLE,
      likeSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(LIKE_TABLE);
  },
};
