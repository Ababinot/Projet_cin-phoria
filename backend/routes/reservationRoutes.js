const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Existing route
router.get('/reservations', reservationController.getReservations);
module.exports = router;
