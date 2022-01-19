'use strict';
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const DataTypes = Sequelize.DataTypes;
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'likes', {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'visits', {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'sharedCounter', {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    });
    await queryInterface.renameColumn(
      MEDIA_CONTENT_TABLE,
      'sharedCounter',
      'shared_counter'
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const DataTypes = Sequelize.DataTypes;
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'likes', {
      type: DataTypes.INTEGER.UNSIGNED,
    });
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'visits', {
      type: DataTypes.INTEGER.UNSIGNED,
    });
    await queryInterface.changeColumn(MEDIA_CONTENT_TABLE, 'sharedCounter', {
      type: DataTypes.INTEGER.UNSIGNED,
    });
    await queryInterface.renameColumn(
      MEDIA_CONTENT_TABLE,
      'shared_counter',
      'sharedCounter'
    );
  },
};
