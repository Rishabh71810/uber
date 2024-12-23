const express  = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userModel = require('../models/user.model');



router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 letters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],userModel.registerUser);