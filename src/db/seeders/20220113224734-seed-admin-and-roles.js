'use strict';
const { adminPassword } = require('../../config');
const { USER_TABLE } = require('../models/user.model');
const { ROLE_TABLE } = require('../models/role.model');
const { PERMISSION_TABLE } = require('../models/permission.model');
const { hash } = require('../../auth/hash');
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const [user] = await queryInterface.bulkInsert(
      USER_TABLE,
      [
        {
          email: 'admin@mail.com',
          password: await hash(adminPassword),
          user_name: 'admin',
          created_at: '1999-01-08 04:05:06',
          updated_at: '1999-01-08 04:05:06',
        },
      ],
      { returning: true }
    );
    const [role] = await queryInterface.bulkInsert(
      ROLE_TABLE,
      [
        {
          role: 'ADMIN',
        },
      ],
      { returning: true }
    );
    await queryInterface.bulkInsert(PERMISSION_TABLE, [
      {
        user_id: user.id,
        role_id: role.id,
        created_at: '1999-01-08 04:05:06',
        updated_at: '1999-01-08 04:05:06',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
    await queryInterface.bulkDelete(ROLE_TABLE, null, {});
    await queryInterface.bulkDelete(PERMISSION_TABLE, null, {});
  },
};
