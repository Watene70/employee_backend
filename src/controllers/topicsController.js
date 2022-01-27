const sequelize = require("sequelize");
const Op = sequelize.Op;
const policies = require("../../models").topics;

module.exports = {
  getPolicies(result) {
    policies
      .findAll({
        order: [["topic_id", "ASC"]],
      })
      .then((policy) => {
        result(null, policy);
      })
      .catch((err) => {
        result(err, null);
      });
  },
};
