const express = require('express');
const router = express.Router();
const inscriptionController = require('../controllers/inscriptionController');

// Route POST pour l'inscription des utilisateurs
router.post('/inscription', inscriptionController.inscription);

console.log('Route d\'inscription configurée avec succès.');

module.exports = router;
