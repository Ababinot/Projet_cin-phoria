import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async connexion() {
      try {
        // Envoi de la requête pour récupérer tous les utilisateurs
        const response = await axios.get('http://localhost:3001/api/users');
        const users = response.data;

        // Recherche de l'utilisateur par email
        const user = users.find(user => user.email === this.email);

        if (user && await this.checkPassword(this.password, user.mot_de_passe)) {
          // Redirection vers la page d'accueil si les informations sont correctes
          this.$router.push('/');
        } else {
          // Affichage d'un message d'erreur si les informations d'identification sont incorrectes
          alert("Adresse e-mail ou mot de passe incorrect");
        }
      } catch (error) {
        console.error('Erreur pour la connexion :', error);
      }
    },
    async checkPassword(enteredPassword, hashedPassword) {
      // Vérification du mot de passe avec bcrypt
      try {
        
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        console.error(hashedPassword+'  ',enteredPassword);
        return match;
        
      } catch (error) {
        console.error("Erreur lors de la vérification du mot de passe avec bcrypt : "+hashedPassword+'  ',enteredPassword, error);
        return false;
      }
    }
  }
};
