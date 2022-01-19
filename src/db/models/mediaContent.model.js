const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const commonFields = require('./utils/commonFields');
const MEDIA_CONTENT_TABLE = 'media_contents';
const mediaContentSchema = {
  id: commonFields.id,
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mediaKey: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    field: 'media_key',
  },
  likes: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  visits: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  sharedCounter: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
    field: 'shared_counter',
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
  accessStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'access_status',
  },
  disclosureDate: {
    type: DataTypes.DATE,
    field: 'disclosure_date',
  },
  creatorId: commonFields
    .foreign('creator_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
};

class MediaContent extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'creator' });
    this.belongsToMany(models.User, {
      as: 'subscriptors',
      through: models.MediaContentSubscription,
      foreignKey: 'mediaContentId',
      otherKey: 'userId',
    });
    this.belongsToMany(models.User, {
      as: 'peopleWhoLiked',
      through: models.Like,
      foreignKey: 'mediaContentId',
      otherKey: 'userId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDIA_CONTENT_TABLE,
      modelName: 'MediaContent',
      timestamps: true,
      indexes: [{ unique: true, fields: ['media_key'] }],
    };
  }
}

module.exports = { mediaContentSchema, MEDIA_CONTENT_TABLE, MediaContent };
