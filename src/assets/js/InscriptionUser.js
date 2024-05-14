export default {
    data() {
      return {
        nom: '',
        prenom: '',
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      inscription() {
        // Vous pouvez ajouter ici la logique de connexion, comme l'envoi des données au serveur
        console.log('Email:', this.email);
        console.log('Mot de passe:', this.password);
        console.log('Nom:', this.nom);
        console.log('Prénom:', this.prenom);
        console.log('Username:', this.username);
        // Vous pouvez également ajouter des validations supplémentaires avant d'envoyer les données
      }
    }
  };