export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      connexion() {
        // Vous pouvez ajouter ici la logique de connexion, comme l'envoi des données au serveur
        console.log('Email:', this.email);
        console.log('Mot de passe:', this.password);
        // Vous pouvez également ajouter des validations supplémentaires avant d'envoyer les données
      }
    }
  };