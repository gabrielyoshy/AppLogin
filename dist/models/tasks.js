"use strict";

module.exports = function (sequelize, DataType) {
  var Tasks = sequelize.define('Tasks', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Tasks.associate = function (models) {
    Tasks.belongsTo(models.Users);
  };

  return Tasks;
};