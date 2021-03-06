import { MediaContent, mediaContentSchema } from './mediaContent.model';
import { User, userSchema } from './user.model';
import { Role, roleSchema } from './role.model';
import { Permission, permissionSchema } from './permission.model';
import { Friendship, friendshipSchema } from './friendship.model';
import {
  MediaContentSubscription,
  mediaContentSubscriptionSchema,
} from './mediaContentSubscription.model';
import { Like, likeSchema } from './like.model';
import { Tag, tagsSchema } from './tag.model';
import {
  TagMediaContent,
  tagMediaContentSchema,
} from './tagMediaContent.model';
import {
  TagSubscription,
  tagSubscriptionSchema,
} from './tagSubscription.model';
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
  Like.init(likeSchema, Like.config(sequelize));
  Tag.init(tagsSchema, Tag.config(sequelize));
  TagMediaContent.init(
    tagMediaContentSchema,
    TagMediaContent.config(sequelize)
  );
  TagSubscription.init(
    tagSubscriptionSchema,
    TagSubscription.config(sequelize)
  );

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Tag.associate(sequelize.models);
  MediaContent.associate(sequelize.models);

  User.hookConf();
}
