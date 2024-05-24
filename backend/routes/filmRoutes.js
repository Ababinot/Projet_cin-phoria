const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const filmController = require('../controllers/filmController');

router.get('/films', filmController.getFilms);
module.exports = router;