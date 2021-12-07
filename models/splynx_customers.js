'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class splynx_customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  splynx_customers.init({
    customer_number: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    location: DataTypes.STRING,
    package: DataTypes.STRING,
    login: DataTypes.STRING,
    router_contention: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'splynx_customers',
  });
  return splynx_customers;
};