import { DataTypes, Model } from 'sequelize';
import { compare } from '../../auth/hash';
import commonFields from './utils/commonFields';
import { USER_TABLE } from './user.model';
import { MEDIA_CONTENT_TABLE } from './mediaContent.model';
export const TAG_TABLE = 'tags';

export const tagsSchema = {
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
};

export class Tag extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'creator',
    });
    this.belongsTo(models.MediaContent);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TAG_TABLE,
      modelName: 'Tag',
      timestamps: true,
    };
  }
}
