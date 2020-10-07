const express = require('express');
const recipe = require('../models/recipe');
const RecipeIngredient = require('../models').RecipeIngredient;
const Recipe = require('../models').Recipe;
const User = require('../models').User;
const Ingredient = require('../models').Ingredient;
const Direction = require('../models').Direction;
const Review = require('../models').Review;

const renderViewPage = (req, res) => {
    console.log('\n\n\nstart of render view page\n\n\n')
    Recipe.findAll()
    .then(recipe => {
        console.log('\n\n\nafter finding recipes\n\n\n')
        res.render('index.ejs', {
            recipes: recipe,
            // user: 
        })     
        console.log(recipe)   
    }).catch((err) => {
        console.log(err)
        console.log("\n\n\nthis shouldn't happen?\n\n\n")

    })
};

const renderRecipe = (req, res) => {
    Recipe.findByPk(req.params.index, {
        include: [
            {
                model: Ingredient,
                attributes: ['name'],
                include: {
                    model: RecipeIngredient
                    // attributes: ['units']
            }}]
    })
    .then(foundRecipe => {    
        // Need findAll to sort by step_number
        Direction.findAll({
            where: {recipeId: foundRecipe.id},
            order: [['step_number']]

        }).then(directions => {
            // console.log(directions);
            // Need findAll to sort by creation Date
            Review.findAll({
                where: {recipeId: foundRecipe.id},
                include: [{
                    model: User,
                    attributes: ['name', 'username']
                }],
                order: [['createdAt', 'DESC']]
            }).then(reviews => {
                res.render('recipe.ejs', {
                    recipe: foundRecipe,
                    reviews: reviews, // this variable improves readability of ejs file
                    directions: directions,
                    user: req.user
                })
            })
        })
    }).catch(() => {
        res.redirect('/');
    })
}

const deleteRecipe = (req, res) => {
    RecipeIngredient.destroy({
        where: {recipeId: req.params.index}
    })
    .then(() => {
        Direction.destroy({
            where: {recipeId: req.params.index}
        })
        .then(() => {
            Recipe.destroy({
                where: {id: req.params.index}
            })
            .then(() => {
                Review.destroy({
                    where: {recipeId: req.params.index}
                }).then(() => {
                res.redirect('/profile')
                })
            })
        })
    })
}

module.exports = {
    renderViewPage,
    renderRecipe,
    deleteRecipe
};
