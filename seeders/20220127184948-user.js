'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "admin",
        password: "$2a$10$ECdOnZkH6ZRE9jzvUst4x.PNqKwgSHcaoceTxazjMRg1VojEpHh6S",
        user_type:'HR',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        name: "watene",
        password: "$2a$10$ECdOnZkH6ZRE9jzvUst4x.PNqKwgSHcaoceTxazjMRg1VojEpHh6S",
        user_type:'Employee',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
