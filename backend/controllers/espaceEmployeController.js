const connection = require('../config/db');

exports.getFilmEspaceEmploye= (req, res) => {
  connection.query('SELECT * FROM vue_films_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup films pour espace employe');
    }
    res.json(results);
  });
};

exports.getSalleEspaceEmploye= (req, res) => {
  connection.query('SELECT * FROM vue_salles_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup salles pour espace employe');
    }
    res.json(results);
  });
};

exports.getAvisEspaceEmploye= (req, res) => {
  connection.query('SELECT * FROM vue_avis_intranet', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup avis pour espace employe');
    }
    res.json(results);
  });
};

