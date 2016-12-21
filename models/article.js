'use strict';
module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return article;
};
