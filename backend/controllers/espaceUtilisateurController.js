const connection = require('../config/db');

exports.getEspaceUtilisateur= (req, res) => {
  connection.query('SELECT * FROM vue_reservations_utilisateurs', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup reservation pour espace utilisateur');
    }
    res.json(results);
  });
};
