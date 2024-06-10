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

exports.deleteAvis = (req, res) => {
  const idAvis = req.body.id;

  console.log('ID de l\'avis à supprimer :', idAvis); // Ajout du log pour vérifier l'ID de l'avis à supprimer

  connection.query('DELETE FROM avis WHERE id_avis = ?', [idAvis], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression de l\'avis :', error);
      return res.status(500).json({ error: 'La suppression de l\'avis a échoué' });
    }

    console.log('Résultats de la suppression de l\'avis :', results); // Ajout du log pour vérifier les résultats de la suppression

    return res.status(200).json({ message: 'L\'avis a été supprimé avec succès' });
  });
};

exports.deleteFilms = (req, res) => {
  const titre_film = req.body.titre;

  console.log('ID de film à supprimer :', titre_film); // Ajout du log pour vérifier l'ID de l'avis à supprimer

  connection.query('DELETE FROM film WHERE titre = ?', [titre_film], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression de film :', error);
      return res.status(500).json({ error: 'La suppression de film a échoué' });
    }

    console.log('Résultats de la suppression de film :', results); // Ajout du log pour vérifier les résultats de la suppression

    return res.status(200).json({ message: 'Le film a été supprimé avec succès' });
  });
};





