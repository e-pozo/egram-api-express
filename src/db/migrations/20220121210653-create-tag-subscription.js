'use strict';
import { TAG_SUBSCRIPTION_TABLE } from '../models/tagSubscription.model';
import { USER_TABLE } from '../models/user.model';
import { TAG_TABLE } from '../models/tag.model';
import commonFields from '../models/utils/commonFields';
const tagSubscriptionSchema = (DataTypes) => ({
  id: commonFields.id,
  userId: commonFields
    .foreign('user_id', USER_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  tagId: commonFields
    .foreign('tag_id', TAG_TABLE, 'id')
    .add({ onDelete: 'CASCADE' }),
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt,
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TAG_SUBSCRIPTION_TABLE,
      tagSubscriptionSchema(Sequelize.DataTypes)
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TAG_SUBSCRIPTION_TABLE);
  },
};
