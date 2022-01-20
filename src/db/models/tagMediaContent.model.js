import { Model } from 'sequelize';
import commonFields from './utils/commonFields';
import { TAG_TABLE } from './tag.model';
import { MEDIA_CONTENT_TABLE } from './mediaContent.model';
export const TAG_MEDIA_CONTENT_TABLE = 'tags_media_contents';

export const tagMediaContentSchema = {
  id: commonFields.id,
  tagId: commonFields
    .foreign('tag_id', TAG_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  mediaContentId: commonFields
    .foreign('media_content_id', MEDIA_CONTENT_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
};

export class TagMediaContent extends Model {
  static associations(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'TagMediaContent',
      tableName: TAG_MEDIA_CONTENT_TABLE,
      timestamps: true,
    };
  }
}
