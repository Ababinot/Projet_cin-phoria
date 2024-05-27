const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const salleController = require('../controllers/salleController');

router.get('/salles', salleController.getSalle);
module.exports = router;