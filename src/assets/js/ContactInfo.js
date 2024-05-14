export default {
    data() {
      return {
        nom: '',
        titre: '',
        description: '',
      };
    },
    methods: {
      envoyer() {
        // Vous pouvez ajouter ici la logique de connexion, comme l'envoi des données au serveur
        console.log('Nom:', this.nom);
        console.log('titre:', this.titre);
        console.log('description:', this.description);
        // Vous pouvez également ajouter des validations supplémentaires avant d'envoyer les données
      }
    }
  };