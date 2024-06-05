const connection = require('../config/db');
const bcrypt = require('bcrypt');

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

exports.inscription = (req, res) => {
  console.log('Données d\'inscription reçues :', req.body);
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
  connection.query('SELECT email_utilisateur FROM utilisateur WHERE email_utilisateur = ?', [email], (error, results) => {
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

      const query = 'INSERT INTO `utilisateur` (`id_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `email_utilisateur`, `mdp_utilisateur`, `role_utilisateur`, `compte_active`) VALUES (?, ?, ?, ?, ?, ?, ?);';
      connection.query(query, [null, nom, prenom, email, hash, 'Client', 1], (error, results) => {
        if (error) {
          console.error('Erreur lors de l\'inscription :', error.sqlMessage);
          return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
        return res.status(201).json({ message: 'Inscription réussie' });
      });
    });
  });
};
