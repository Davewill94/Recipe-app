const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/signup', ctrl.auth.renderSignUp);
router.get('/login', ctrl.auth.renderLogin);
router.get('/profile', ctrl.auth.renderProfile);
router.get('/new', ctrl.auth.renderNewRecipe);


router.post('/createUser', ctrl.auth.createUser);
router.post('/newRecipe', ctrl.auth.createNewRecipe);

module.exports = router;