const connection = require('../config/db');

exports.getEspaceEmploye= (req, res) => {
  connection.query('SELECT * FROM vue_reservations_utilisateurs', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup reservation pour espace employe');
    }
    res.json(results);
  });
};
