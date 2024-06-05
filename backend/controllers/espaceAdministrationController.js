const connection = require('../config/db');

exports.getFilmEspaceAdministration= (req, res) => {
  connection.query('SELECT * FROM vue_films_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup films pour espace administration');
    }
    res.json(results);
  });
};

exports.getSalleEspaceAdministration= (req, res) => {
  connection.query('SELECT * FROM vue_salles_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup salles pour espace admin');
    }
    res.json(results);
  });
};

exports.getNbreservationEspaceAdministration= (req, res) => {
  connection.query('SELECT * FROM vue_reservations_par_film', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup salles pour espace admin');
    }
    res.json(results);
  });
};



