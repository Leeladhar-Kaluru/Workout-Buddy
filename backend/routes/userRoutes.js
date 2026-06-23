const express = require('express');
const router = express.Router();
const { loginUser, signupUser } = require('../controllers/userController');

// user login route
router.post('/login', loginUser);

//user signup route
router.post('/signup', signupUser);

module.exports = router;