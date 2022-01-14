'use strict';
const { MEDIA_CONTENT_TABLE } = require('../models/mediaContent.model');
const { USER_TABLE } = require('../models/user.model');
const { FRIENDSHIP_TABLE } = require('../models/friendship.model');
const { ROLE_TABLE } = require('../models/role.model');
const { PERMISSION_TABLE } = require('../models/permission.model');
const commonFields = require('../models/utils/commonFields');
const MediaContentSchema = (DataTypes) => ({
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
  },
  visits: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  sharedCounter: {
    type: DataTypes.INTEGER.UNSIGNED,
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
});

const UserSchema = (DataTypes) => ({
  id: commonFields.id,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recoveryToken: {
    type: DataTypes.STRING,
    field: 'recovery_token',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'user_name',
  },
  nickName: {
    type: DataTypes.STRING,
    field: 'nick_name',
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});

const PermissionSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  roleId: commonFields
    .foreign('role_id', ROLE_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});

const RoleSchema = (DataTypes) => ({
  id: commonFields.id,
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const FriendshipSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  friendId: commonFields
    .foreign('friend_id', USER_TABLE, 'id')
    .add({ unique: 'composite', allowNull: false }),
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'REQUEST',
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      MEDIA_CONTENT_TABLE,
      MediaContentSchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      USER_TABLE,
      UserSchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      FRIENDSHIP_TABLE,
      FriendshipSchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      ROLE_TABLE,
      RoleSchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      PERMISSION_TABLE,
      PermissionSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable(PERMISSION_TABLE);
    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(FRIENDSHIP_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(MEDIA_CONTENT_TABLE);
  },
};
