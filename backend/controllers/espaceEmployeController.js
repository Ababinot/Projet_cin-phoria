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

exports.ajouterFilm = (req, res) => {
  const { titre, description, image, genre, age_minimum } = req.body;
  console.log('Données reçues pour le film:', req.body);

  if (!titre || !description || !image || !genre) {
    return res.status(400).json({ error: 'Les champs requis sont manquants' });
  }

  const query = 'INSERT INTO film (titre, description, image, genre, age_minimum) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [titre, description, image, genre, age_minimum], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout du film' });
    }
    res.status(201).json({ message: 'Film ajouté avec succès', id: results.insertId });
  });
};

exports.ajouterSeance = (req, res) => {
  const { date_debut, date_fin, id_film_seance, id_salle} = req.body;
  console.log('Données reçues pour le film:', req.body);

  if (!date_debut || !date_fin || !id_film_seance || !id_salle) {
    return res.status(400).json({ error: 'Les champs requis sont manquants' });
  }

  const query = 'INSERT INTO seance (date_debut, date_fin, id_film_seance, id_salle) VALUES (?, ?, ?, ?)';
  connection.query(query, [date_debut, date_fin, id_film_seance, id_salle], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de seance :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de seance' });
    }
    res.status(201).json({ message: 'Seance ajouté avec succès', id: results.insertId });
  });
};

exports.modifierFilm = (req, res) => {
  const id_film = req.params.id_film; // Récupérer l'identifiant du film depuis les paramètres de la requête
  const { titre, description, image, genre, age_minimum } = req.body;
  console.log('Données reçues pour la modification du film:', req.body);

  // Vérifiez si toutes les informations requises sont présentes
  if (!id_film || !titre || !description || !image || !genre) {
    return res.status(400).json({ error: 'Les champs requis sont manquants' });
  }

  // Exécutez la requête SQL UPDATE pour modifier le film
  const query = 'UPDATE film SET titre=?, description=?, image=?, genre=?, age_minimum=? WHERE id_film=?';
  connection.query(query, [titre, description, image, genre, age_minimum, id_film], (error, results) => {
    if (error) {
      console.error('Erreur lors de la modification du film:', error);
      return res.status(500).json({ error: 'Erreur lors de la modification du film' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Film non trouvé' });
    }
    res.status(200).json({ message: 'Film modifié avec succès' });
  });
};

exports.getFilmByTitre = (req, res) => {
  const titre = req.params.titre; // Récupérer le titre du film depuis les paramètres de la requête

  connection.query('SELECT * FROM film WHERE titre = ?', [titre], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des détails du film pour modification :', error);
      return res.status(500).json({ error: 'La récupération des détails du film pour modification a échoué' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucun film trouvé avec ce titre' });
    }

    // Envoyer les détails du film trouvé en réponse
    res.json(results[0]);
  });
};







