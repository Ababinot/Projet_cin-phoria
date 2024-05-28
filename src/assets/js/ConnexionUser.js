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
        // Envoi de la requête pour récupérer le hash du mot de passe
        const response = await axios.get(`http://localhost:3001/api/users/${this.email}`);
        const user = response.data;

        // Vérification si l'utilisateur existe et si le mot de passe correspond
        if (user && await this.checkPassword(this.password, user.password)) {
          // Redirection vers la page d'accueil si les informations sont correctes
          this.$router.push('/accueil');
        } else {
          // Affichage d'un message d'erreur si les informations d'identification sont incorrectes
          alert("Adresse e-mail ou mot de passe incorrect");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async checkPassword(enteredPassword, hashedPassword) {
      // Vérification du mot de passe avec bcrypt
      try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
      } catch (error) {
        console.error("Erreur lors de la vérification du mot de passe avec bcrypt : ", error);
        return false;
      }
    }
    
  }
};