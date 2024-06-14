const connection = require('../config/db');

exports.getEspaceUtilisateur= (req, res) => {
  connection.query('SELECT * FROM vue_reservations_utilisateurs', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup reservation pour espace utilisateur');
    }
    res.json(results);
  });
};

exports.ajouterAvis = (req, res) => {
  const { note, commentaire, id_film } = req.body;

  // Vérifier si tous les champs requis sont présents
  if (!note || !commentaire || !id_film) {
    return res.status(400).send('Les champs requis sont manquants');
  }

  // Insérer l'avis dans la base de données
  const query = 'INSERT INTO avis (note, commentaire, id_film) VALUES (?, ?, ?)';
  connection.query(query, [note, commentaire, id_film], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de l\'avis :', error);
      return res.status(500).send('Erreur lors de l\'ajout de l\'avis');
    }
    res.status(201).json({ message: 'Avis ajouté avec succès', id: results.insertId });
  });
};

