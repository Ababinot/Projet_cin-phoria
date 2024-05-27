const connection = require('../config/db');

exports.getSalle = (req, res) => {
  connection.query('SELECT * FROM salle', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup salle');
    }
    res.json(results);
  });
};
