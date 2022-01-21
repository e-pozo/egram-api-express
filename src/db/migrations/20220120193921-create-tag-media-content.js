'use strict';
import { TAG_TABLE } from '../models/tag.model';
import { MEDIA_CONTENT_TABLE } from '../models/mediaContent.model';
import { TAG_MEDIA_CONTENT_TABLE } from '../models/tagMediaContent.model';
import commonFields from '../models/utils/commonFields';
const tagMediaContentSchema = (_DataTypes) => ({
  id: commonFields.id,
  tagId: commonFields
    .foreign('tag_id', TAG_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  mediaContentId: commonFields
    .foreign('media_content_id', MEDIA_CONTENT_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TAG_MEDIA_CONTENT_TABLE,
      tagMediaContentSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TAG_MEDIA_CONTENT_TABLE);
  },
};
