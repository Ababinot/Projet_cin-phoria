const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceEmployeController = require('../controllers/espaceEmployeController');

router.get('/espace-employe-film', espaceEmployeController.getFilmEspaceEmploye);
module.exports = router;