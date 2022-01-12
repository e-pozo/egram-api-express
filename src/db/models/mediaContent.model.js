const { Model, DataTypes } = require('sequelize');
const { commonFields } = require('./utils/commonFields');
const MEDIA_CONTENT_TABLE = 'media_contents';
const mediaContentSchema = {
  id: commonFields.id,
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mediaURL: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'media_url',
  },
  likes: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  visits: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  sharedCounter: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
  disclosureDate: {
    type: DataTypes.DATE,
    field: 'disclosure_date',
  },
};

class MediaContent extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDIA_CONTENT_TABLE,
      modelName: 'MediaContent',
      timestamps: true,
    };
  }
}

module.exports = { mediaContentSchema, MEDIA_CONTENT_TABLE, MediaContent };
