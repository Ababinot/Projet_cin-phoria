const connection = require('../config/db');

exports.getFilmEspaceEmploye= (req, res) => {
  connection.query('SELECT * FROM vue_films_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup films pour espace employe');
    }
    res.json(results);
  });
};
