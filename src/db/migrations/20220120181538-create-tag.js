'use strict';
import { TAG_TABLE } from '../models/tag.model';
import { USER_TABLE } from '../models/user.model';
import { MEDIA_CONTENT_TABLE } from '../models/mediaContent.model';
import commonFields from '../models/utils/commonFields';

const tagsSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  mediaContentId: commonFields
    .foreign('media_content_id', MEDIA_CONTENT_TABLE, 'id')
    .add({ onDelete: 'SET NULL' }),
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  visits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  subscriptions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable(TAG_TABLE, tagsSchema(Sequelize.DataTypes));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.dropTable(TAG_TABLE);
  },
};
