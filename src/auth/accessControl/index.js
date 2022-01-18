import { AccessControl } from 'accesscontrol';
import boom from '@hapi/boom';
let grantsObject = {
  ADMIN: {
    user: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    mediaContent: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    role: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    permission: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    frienship: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  USER: {
    user: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    mediaContent: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
    publicMediaContent: {
      'read:any': ['*'],
    },
    friendMediaContent: {
      'read:own': ['*'],
    },
    role: {
      'read:own': ['*'],
    },
    permission: {
      'read:own': ['*'],
    },
    friendship: {
      'create:own': ['*'],
      'read:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
  },
};

export const ac = new AccessControl(grantsObject);
export function checkAccess(permissionCb) {
  return ({ user }, _res, next) => {
    if (permissionCb(user.roles).granted) next();
    else next(boom.forbidden('forbidden resource'));
  };
}
