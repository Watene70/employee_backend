"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "topics",
      [
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 2-5 workdays?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          question:
            "When should one provide a notice when taking off 1 workday?",
          topic_id: 1,
          marks: 10,
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
