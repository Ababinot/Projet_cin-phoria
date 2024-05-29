const connection = require('../config/db');

exports.postUsers = (req, res) => {
  connection.query('SELECT * FROM vue_utilisateurs_employes', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup users');
    }
    res.json(results);
  });
};

