const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const espaceEmployeController = require('../controllers/espaceEmployeController');
const { route } = require('./reservationRoutes');

router.get('/espace-employe-film', espaceEmployeController.getFilmEspaceEmploye);
router.get('/espace-employe-film/:titre', espaceEmployeController.getFilmByTitre);

router.get('/espace-employe-salle', espaceEmployeController.getSalleEspaceEmploye);
router.get('/espace-employe-salle/:id_salle', espaceEmployeController.getSalleById);

router.get('/espace-employe-avis', espaceEmployeController.getAvisEspaceEmploye);
router.get('/espace-employe-seance/:titre', espaceEmployeController.getSeanceByFilm);

router.get('/cinema', espaceEmployeController.getCinema);

router.delete('/supprimer-avis', espaceEmployeController.deleteAvis);
router.delete('/supprimer-film', espaceEmployeController.deleteFilms);
router.delete('/supprimer-salle', espaceEmployeController.deleteSalles);

router.post('/ajouter-film', espaceEmployeController.ajouterFilm);
router.post('/ajouter-seance', espaceEmployeController.ajouterSeance);
router.post('/ajouter-salle', espaceEmployeController.ajouterSalle);
router.post('/modifier-film/:id_film', espaceEmployeController.modifierFilm);
router.post('/modifier-salle/:id_salle', espaceEmployeController.modifierSalle);

module.exports = router;