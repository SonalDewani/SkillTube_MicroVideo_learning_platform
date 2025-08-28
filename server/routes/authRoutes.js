const express = require('express');
const router = express.Router();
const { register, login, getMe, logoutUser } = require('../controller/authController');
const { protect } = require('../helper/helperFunctions');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post("/logout", logoutUser);

module.exports = router;
