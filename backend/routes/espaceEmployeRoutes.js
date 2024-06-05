const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceEmployeController = require('../controllers/espaceEmployeController');

router.get('/espace-employe-film', espaceEmployeController.getFilmEspaceEmploye);
router.get('/espace-employe-salle', espaceEmployeController.getSalleEspaceEmploye);
router.get('/espace-employe-avis', espaceEmployeController.getAvisEspaceEmploye);
module.exports = router;