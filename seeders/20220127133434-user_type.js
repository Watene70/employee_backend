"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user_types", [
      {
        name: "HR",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        name: "Employee",
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_types", null, {});
  },
};
