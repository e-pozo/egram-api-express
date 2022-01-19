import { MediaContent, mediaContentSchema } from './mediaContent.model';
import { User, userSchema } from './user.model';
import { Role, roleSchema } from './role.model';
import { Permission, permissionSchema } from './permission.model';
import { Friendship, friendshipSchema } from './friendship.model';
import {
  MediaContentSubscription,
  mediaContentSubscriptionSchema,
} from './mediaContentSubscription.model';
export function setupModels(sequelize) {
  MediaContent.init(mediaContentSchema, MediaContent.config(sequelize));
  User.init(userSchema, User.config(sequelize));
  Role.init(roleSchema, Role.config(sequelize));
  Permission.init(permissionSchema, Permission.config(sequelize));
  Friendship.init(friendshipSchema, Friendship.config(sequelize));
  MediaContentSubscription.init(
    mediaContentSubscriptionSchema,
    MediaContentSubscription.config(sequelize)
  );

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  MediaContent.associate(sequelize.models);
  MediaContentSubscription.associate(sequelize.models);

  User.hookConf();
}
