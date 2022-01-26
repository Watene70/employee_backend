"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "topics",
      [
        {
          topic_name: "Attendance and Leave Policy",
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          topic_name: "Email and Internet Policy",
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          topic_name: "Confidentiality Agreement Policy",
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          topic_name: "Dress Code Policy",
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          topic_name: "Bereavement Policy",
          updated_at: new Date(),
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("topics", null, {});
  },
};
