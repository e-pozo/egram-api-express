'use strict';
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
const { commonFields } = require('../models/utils/commonFields');
const Schema = (DataTypes) => ({
  id: commonFields.id,
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mediaKey: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'media_key',
  },
  likes: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  visits: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  sharedCounter: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
  accessStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'access_status',
  },
  disclosureDate: {
    type: DataTypes.DATE,
    field: 'disclosure_date',
  },
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      MEDIA_CONTENT_TABLE,
      Schema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(MEDIA_CONTENT_TABLE);
  },
};
