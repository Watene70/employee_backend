const sequelize = require("sequelize");
const Op = sequelize.Op;
const mtihani = require("../../models").assesment;

module.exports = {
  getAssesment(result) {
    mtihani
      .findAll({
        raw: true,
        // order: [["assesment_id", "ASC"]],
      })
      .then((test) => {
        console.log(test);
        result(null, test);
      })
      .catch((err) => {
        result(err, null);
      });
  },
};
