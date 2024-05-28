const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);


module.exports = router;