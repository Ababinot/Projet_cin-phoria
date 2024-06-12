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


exports.getSeanceByFilm = (req, res) => {
  const titre = req.params.titre; // Récupérer le titre du film depuis les paramètres de la requête

  connection.query('SELECT * FROM vue_seances_detail WHERE nom_film = ?', [titre], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des détails du film pour les séances :', error);
      return res.status(500).json({ error: 'La récupération des détails du film pour les séances a échoué' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucune séance trouvée avec ce film' });
    }

    // Envoyer les détails des séances du film trouvé en réponse
    res.json(results);
  });
};

exports.deleteSalles = (req, res) => {
  const id_salle = req.body.idSalle;

  console.log('ID de salle à supprimer :', id_salle);

  // Supprimer d'abord les enregistrements dans la table seance qui font référence à la salle
  connection.query('DELETE FROM seance WHERE id_salle = ?', [id_salle], (error, results) => {
    if (error) {
      console.error('Erreur lors de la suppression des séances liées à la salle :', error);
      return res.status(500).json({ error: 'La suppression des séances liées à la salle a échoué' });
    }

    // Une fois les séances supprimées, supprimer la salle
    connection.query('DELETE FROM salle WHERE id_salle = ?', [id_salle], (error, results) => {
      if (error) {
        console.error('Erreur lors de la suppression de la salle :', error);
        return res.status(500).json({ error: 'La suppression de la salle a échoué' });
      }

      console.log('Résultats de la suppression de la salle :', results);
      return res.status(200).json({ message: 'La salle a été supprimée avec succès' });
    });
  });
};

exports.ajouterSalle = (req, res) => {
  const { num_salle, capacite, type_projection, id_cinema} = req.body;
  console.log('Données reçues pour la salle:', req.body);

  if (!num_salle || !capacite || !type_projection || !id_cinema) {
    return res.status(400).json({ error: 'Les champs requis sont manquants' });
  }

  const query = 'INSERT INTO salle (num_salle, capacite, type_projection, id_cinema) VALUES (?, ?, ?, ?)';
  connection.query(query, [num_salle, capacite, type_projection, id_cinema], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'ajout de salle :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'ajout de salle' });
    }
    res.status(201).json({ message: 'Salle ajouté avec succès', id: results.insertId });
  });
};

exports.getCinema= (req, res) => {
  connection.query('SELECT * FROM cinema', (error, results) => {
    if (error) {
      return res.status(500).send('erreur de récup films pour espace employe');
    }
    res.json(results);
  });
};


exports.modifierSalle = (req, res) => {
  const id_salle = req.params.id_salle; // Récupérer l'identifiant de la salle depuis les paramètres de la requête
  const { num_salle, capacite, type_projection, id_cinema } = req.body; // Ajout de id dans la destructuration
  console.log('Données reçues pour la modification de la salle:', req.body);

  // Vérifiez si toutes les informations requises sont présentes
  if ( !num_salle || !capacite || !type_projection || !id_cinema) { // Ajout de la vérification pour id
    return res.status(400).json({ error: 'Les champs requis sont manquants' });
  }

  // Exécutez la requête SQL UPDATE pour modifier la salle
  const query = 'UPDATE salle SET num_salle=?, capacite=?, type_projection=?, id_cinema=? WHERE id_salle=?';
  connection.query(query, [num_salle, capacite, type_projection, id_cinema, id_salle], (error, results) => {
    if (error) {
      console.error('Erreur lors de la modification de la salle:', error);
      return res.status(500).json({ error: 'Erreur lors de la modification de la salle' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Salle non trouvée' });
    }
    res.status(200).json({ message: 'Salle modifiée avec succès' });
  });
};

exports.getSalleById = (req, res) => {
  const id_salle = req.params.id_salle; // Récupérer l'identifiant de la salle depuis les paramètres de la requête

  connection.query('SELECT * FROM vue_salles_intranet WHERE id_salle = ?', [id_salle], (error, results) => {
    if (error) {
      console.error('Erreur lors de la récupération des détails de la salle pour modification :', error);
      return res.status(500).json({ error: 'La récupération des détails de la salle pour modification a échoué' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucune salle trouvée avec cet identifiant' });
    }

    // Envoyer les détails de la salle trouvée en réponse
    res.json(results[0]);
  });
};









