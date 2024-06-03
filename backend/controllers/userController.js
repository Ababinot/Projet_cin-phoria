const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'votre_clé_secrète';

// Fonction pour récupérer les utilisateurs
exports.postUsers = (req, res) => {
  connection.query('SELECT * FROM vue_utilisateurs_employes', (error, results) => {
    if (error) {
      return res.status(500).send('Erreur de récupération des utilisateurs');
    }
    res.json(results);
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT id, email, role, mot_de_passe FROM vue_utilisateurs_employes WHERE email = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).send('Erreur lors de la connexion');
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.mot_de_passe);
    if (!validPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  });
};

// Middleware pour vérifier le token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Échec de l\'authentification du token' });
    }

    req.user = decoded;
    next();
  });
};
