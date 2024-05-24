const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const reservationController = require('../controllers/reservationController');

router.get('/reservations', reservationController.getReservations);
module.exports = router;