'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tariffs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tariffs.init({
    tariff_id: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tariffs',
  });
  return tariffs;
};