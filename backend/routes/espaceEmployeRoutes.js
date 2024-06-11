const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceEmployeController = require('../controllers/espaceEmployeController');
const { route } = require('./reservationRoutes');

router.get('/espace-employe-film', espaceEmployeController.getFilmEspaceEmploye);
router.get('/espace-employe-film/:titre', espaceEmployeController.getFilmByTitre);
router.get('/espace-employe-salle', espaceEmployeController.getSalleEspaceEmploye);
router.get('/espace-employe-avis', espaceEmployeController.getAvisEspaceEmploye);
router.delete('/supprimer-avis', espaceEmployeController.deleteAvis);
router.delete('/supprimer-film', espaceEmployeController.deleteFilms);
router.post('/ajouter-film', espaceEmployeController.ajouterFilm);
router.post('/ajouter-seance', espaceEmployeController.ajouterSeance);
router.post('/modifier-film/:id_film', espaceEmployeController.modifierFilm);
module.exports = router;