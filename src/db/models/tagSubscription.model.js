import {DataTypes, Model} from 'sequelize'
import commonFields from './utils/commonFields'
import { USER_TABLE } from './user.model'
import {TAG_TABLE} from './tag.model'
export const TAG_SUBSCRIPTION_TABLE = 'tag_subscriptions'
export const tagSubscriptionSchema = {
  id: commonFields.id,
  userId: commonFields.foreign('user_id', USER_TABLE, 'id').add({onDelete: "CASCADE"}),
  tagId: commonFields.foreign('tag_id', TAG_TABLE, 'id').add({onDelete: "CASCADE"}),
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  createdAt: commonFields.createdAt,
  updatedAt: commonFields.updatedAt
}

export class TagSubscription extends Model {
  static associate(models){

  }

  static config(sequelize){
    return {
      sequelize,
      modelName: 'TagSubscription',
      tableName: TAG_SUBSCRIPTION_TABLE,
      timestamps: true
    }
  }
}
