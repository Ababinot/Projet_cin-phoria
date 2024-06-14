const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const reservationController = require('../controllers/reservationController');

router.get('/reservation', reservationController.getVue_reservation);
router.post('/ajouter-reservation', reservationController.ajouterReservation);
module.exports = router;