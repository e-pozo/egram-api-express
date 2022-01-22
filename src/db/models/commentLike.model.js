import { DataTypes, Model } from 'sequelize';
import { USER_TABLE } from './user.model';
import { COMMENT_TABLE } from './comment.model';
import commonFields from './utils/commonFields';
export const COMMENT_LIKE_TABLE = 'comment_likes';
export const commentLikeSchema = {
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
};

export class CommentLike extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'CommentLike',
      tableName: COMMENT_LIKE_TABLE,
      timestamps: true,
    };
  }
}
