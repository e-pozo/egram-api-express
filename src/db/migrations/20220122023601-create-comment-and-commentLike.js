'use strict';
import commonFields from '../models/utils/commonFields';
import { COMMENT_TABLE } from '../models/comment.model';
import { COMMENT_LIKE_TABLE } from '../models/commentLike.model';
import { USER_TABLE } from '../models/user.model';
import { MEDIA_CONTENT_TABLE } from '../models/mediaContent.model';
const commentSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  mediaContentId: commonFields
    .foreign('media_content_id', MEDIA_CONTENT_TABLE, 'id')
    .add({ onDelete: 'SET NULL' }),
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});
const commentLikeSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  commentId: commonFields
    .foreign('comment_id', COMMENT_TABLE, 'id')
    .add({ onDelete: 'SET NULL' }),
  active: {
    type: DataTypes.BOOLEAN,
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
    await queryInterface.createTable(
      COMMENT_TABLE,
      commentSchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      COMMENT_LIKE_TABLE,
      commentLikeSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(COMMENT_LIKE_TABLE);
    await queryInterface.dropTable(COMMENT_TABLE);
  },
};
