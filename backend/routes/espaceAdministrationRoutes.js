const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceAdministrationController = require('../controllers/espaceAdministrationController');

router.get('/espace-administration-film', espaceAdministrationController.getFilmEspaceAdministration);
router.get('/espace-administration-salle', espaceAdministrationController.getSalleEspaceAdministration);

module.exports = router;