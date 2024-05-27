const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const seanceController = require('../controllers/seanceController');

router.get('/seances', seanceController.getSeance);
module.exports = router;