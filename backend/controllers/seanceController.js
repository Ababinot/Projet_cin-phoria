const connection = require('../config/db');

exports.getSeance = (req, res) => {
  connection.query('SELECT * FROM vue_seances', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup séances');
    }
    res.json(results);
  });
};

exports.getSeance_film_cinema = (req, res) => {
  connection.query('SELECT * FROM vue_seances_detail', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup filtre ');
    }
    res.json(results);
  });
};
