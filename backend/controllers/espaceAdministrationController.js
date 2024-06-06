const connection = require('../config/db');
const bcrypt = require('bcrypt');

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

// Fonction pour valider le mot de passe
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return regex.test(password);
}

// Fonction pour valider l'email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

exports.inscriptionEmploye = (req, res) => {
  const { email, nom, prenom, password, verif_password } = req.body;

  if (!email || !nom || !prenom || !password || !verif_password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Adresse email invalide' });
  }

  if (password !== verif_password) {
    return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.' });
  }

  // Vérifier si l'email existe déjà
  connection.query('SELECT email_employe FROM employe WHERE email_employe = ?', [email], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification de l\'email :', error);
      return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'L\'adresse email est déjà utilisée' });
    }

    // Hachage du mot de passe et insertion dans la base de données
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
      }

      const query = 'INSERT INTO `employe` (`id_employe`, `nom_employe`, `prenom_employe`, `email_employe`, `mdp_employe`, `role_employe`) VALUES (?, ?, ?, ?, ?, ?);';
      connection.query(query, [null, nom, prenom, email, hash, 'employe'], (error, results) => {
        if (error) {
          console.error('Erreur lors de l\'inscription :', error.sqlMessage);
          return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
        return res.status(201).json({ message: 'Inscription réussie' });
      });
    });
  });
};

exports.updateEmploye = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Adresse email invalide' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.' });
  }

  // Vérifier si l'employé existe et a le rôle "employe"
  const checkQuery = 'SELECT * FROM employe WHERE email_employe = ? AND role_employe = ?';
  connection.query(checkQuery, [email, 'employe'], (error, results) => {
    if (error) {
      console.error('Erreur lors de la vérification de l\'employé :', error);
      return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }

    if (results.length === 0) {
      return res.status(404).json('N\'a pas le rôle "employe"' );
    }

    // Hachage du nouveau mot de passe et mise à jour de la base de données
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
        return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
      }

      const updateQuery = 'UPDATE employe SET mdp_employe = ? WHERE email_employe = ?';
      connection.query(updateQuery, [hash, email], (error, results) => {
        if (error) {
          console.error('Erreur lors de la mise à jour :', error.sqlMessage);
          return res.status(500).json({ error: 'Erreur lors de la mise à jour' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Employé non trouvé' });
        }
        return res.status(200).json({ message: 'Mise à jour réussie' });
      });
    });
  });
};

