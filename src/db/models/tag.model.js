import { DataTypes, Model } from 'sequelize';
import commonFields from './utils/commonFields';
import { USER_TABLE } from './user.model';
export const TAG_TABLE = 'tags';

export const tagsSchema = {
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
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
      foreignKey: 'userId',
    });
    this.belongsToMany(models.MediaContent, {
      as: 'mediaContents',
      through: models.TagMediaContent,
      foreignKey: 'tagId',
      otherKey: 'mediaContentId',
    });
    this.belongsToMany(models.User, {
      as: 'subscribers',
      through: models.TagSubscription,
      foreignKey: 'tagId',
      otherKey: 'userId',
    });
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
