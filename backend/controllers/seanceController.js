const connection = require('../config/db');

exports.getSeance = (req, res) => {
  connection.query('SELECT * FROM vue_seances', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup séances');
    }
    res.json(results);
  });
};
