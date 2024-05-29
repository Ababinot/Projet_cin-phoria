const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const userController = require('../controllers/userController');

router.post('/users', userController.postUsers);


module.exports = router;