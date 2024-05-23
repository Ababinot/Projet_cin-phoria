const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

// Existing route
router.get('/films', filmController.getFilms);
module.exports = router;