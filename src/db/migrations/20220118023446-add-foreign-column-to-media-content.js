'use strict';
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
const commonFields = require('../models/utils/commonFields');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      MEDIA_CONTENT_TABLE,
      'creator_id',
      commonFields
        .foreign('creator_id', MEDIA_CONTENT_TABLE, 'id')
        .add({ onDelete: 'CASCADE' })
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(MEDIA_CONTENT_TABLE, 'creator_id');
  },
};
