const connection = require('../config/db');

exports.getVue_reservation = (req, res) => {
  connection.query('SELECT * FROM vue_reservation', (error, results) => {
    if (error) {
      return res.status(500).send('Error retrieving reservations');
    }
    res.json(results);
  });
};



exports.ajouterReservation = (req, res) => {
  const { date_reservation, nombre_personnes, prix_total, statut, id_seance, id_utilisateur_res } = req.body;
  console.log('Données reçues pour la réservation:', req.body);
  
  if (!date_reservation || !nombre_personnes || !prix_total || !statut || !id_seance || !id_utilisateur_res) {
    return res.status(400).send('Les champs requis sont manquants');
  }

  const query = 'INSERT INTO reservation (date_reservation, nombre_personnes, prix_total, statut, id_seance, id_utilisateur_res) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [date_reservation, nombre_personnes, prix_total, statut, id_seance, id_utilisateur_res], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de la réservation:', error);
      return res.status(500).send('Erreur lors de l\'ajout de la réservation');
    }
    res.status(201).json({ message: 'Réservation ajoutée avec succès', id: results.insertId });
  });
};
