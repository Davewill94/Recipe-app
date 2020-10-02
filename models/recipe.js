'use strict';
const {
  Model
} = require('sequelize');
const recipeingredient = require('./recipeingredient');
const savedrecipes = require('./savedrecipes');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.User, {foreignKey: 'userId'});
      Recipe.hasMany(models.Direction, {foreignKey: 'id'});
      Recipe.belongsToMany(models.Ingredient, {
        through: 'recipeingredient',
        foreignKey: 'recipeId',
        otherkey: 'ingredientId'
      });
      Recipe.belongsToMany(models.User, {
        through: 'SavedRecipes',
        foreignKey: 'recipeId',
        otherKey: 'userId'
      })
      // define association here
    }
  };
  Recipe.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};