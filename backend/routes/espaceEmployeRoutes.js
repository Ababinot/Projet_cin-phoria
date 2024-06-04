const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceEmployeController = require('../controllers/espaceEmployeController');

router.get('/espace-employe-film', espaceEmployeController.getFilmEspaceEmploye);
router.get('/espace-employe-salle', espaceEmployeController.getSalleEspaceEmploye);
module.exports = router;