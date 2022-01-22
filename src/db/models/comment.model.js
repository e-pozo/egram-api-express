import { DataTypes, Model } from 'sequelize';
import { USER_TABLE } from './user.model';
import { MEDIA_CONTENT_TABLE } from './mediaContent.model';
import commonFields from './utils/commonFields';
export const COMMENT_TABLE = 'comments';
export const commentSchema = {
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
};

export class Comment extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      as: 'peopleWhoLikes',
      through: models.CommentLike,
      foreignKey: 'commentId',
      otherKey: 'userId',
    });
    this.belongsTo(models.User, { as: 'creator', foreignKey: 'userId' });
    this.belongsTo(models.MediaContent, {
      as: 'subject',
      foreignKey: 'mediaContentId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Comment',
      tableName: COMMENT_TABLE,
      timestamp: true,
    };
  }
}
