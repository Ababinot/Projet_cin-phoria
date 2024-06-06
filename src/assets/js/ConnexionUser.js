import axios from 'axios';

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
        const response = await axios.post('http://localhost:3001/api/login', {
          email: this.email,
          password: this.password
        });

        const token = response.data.token;
        
        const user_id = response.data.user_id.replace(/\D/g, '');
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);

        // Redirige vers la page d'accueil après rechargement
        this.reloadAndRedirectToAccueil();

      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Adresse e-mail ou mot de passe incorrect');
      }
    },

    reloadAndRedirectToAccueil() {
      window.location.reload();
    }
  }
};
