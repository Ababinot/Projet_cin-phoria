const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const seanceController = require('../controllers/seanceController');

router.get('/seances', seanceController.getSeance);
router.get('/seances/filtre', seanceController.getSeance_film_cinema);
module.exports = router;