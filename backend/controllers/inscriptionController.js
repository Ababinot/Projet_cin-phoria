const connection = require('../config/db');

exports.inscription = (req, res) => {
  console.log('Données d\'inscription reçues :', req.body);
  // Récupérer les données d'inscription depuis le corps de la requête
  const { email, nom, prenom, password, verif_password, } = req.body;

  // Valider les données d'inscription (vous devriez implémenter votre propre logique de validation)
  if (!email || !nom || !prenom || !password || !verif_password) {
    return res.status(400).send('Tous les champs sont requis');
  }

  // Insérer les données d'inscription dans la base de données
  const query = 'INSERT INTO utilisateur (email_utilisateur, nom_utilisateur, prenom_utilisateur, mdp_utilisateur, role_utilisateur, compte_active) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [email, nom, prenom, password, 'Client', 1], (error, results) => {
    if (error) {
      console.error('Erreur lors de l\'inscription :', error);
      return res.status(500).send('Erreur lors de l\'inscription');
    }
    return res.status(201).send('Inscription réussie');
  });
};
