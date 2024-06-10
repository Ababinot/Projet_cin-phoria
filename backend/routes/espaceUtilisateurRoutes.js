const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceUtilisateurController = require('../controllers/espaceUtilisateurController');

router.get('/espace-utilisateur', espaceUtilisateurController.getEspaceUtilisateur);
router.post('/ajouter-avis', espaceUtilisateurController.ajouterAvis);
module.exports = router;