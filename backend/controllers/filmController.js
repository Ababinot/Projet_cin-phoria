const connection = require('../config/db');

exports.getFilms = (req, res) => {
  connection.query('SELECT * FROM FILM', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup film');
    }
    res.json(results);
  });
};
