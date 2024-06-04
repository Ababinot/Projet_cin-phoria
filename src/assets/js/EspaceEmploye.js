

export default {
  data() {
    return {
      espace_employe_film: [],
    };
  },
  methods: {
    async fetchfilms() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-employe-film');
        const data = await response.json();
        this.espace_employe_film = data;

        
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },
    

    
    decodeJwt(token) {
      // Fonction pour décoder le token JWT
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);

        console.log('Token JWT décodé :', decodedToken);

        return decodedToken;
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
      }
    },

    afficherDialog() {
      // Ouvrir la boîte de dialogue
      this.$refs.dialog.showModal();
    },
    fermerDialog() {
      // Fermer la boîte de dialogue
      this.$refs.dialog.close();
    },

  },
  mounted() {
    this.fetchfilms();
  }
};
