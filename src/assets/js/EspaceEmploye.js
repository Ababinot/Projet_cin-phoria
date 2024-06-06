export default {
  data() {
    return {
      espace_employe_film: [],
      espace_employe_salle: [],
      espace_employe_avis: [],
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

    async fetchsalles() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-employe-salle');
        const data = await response.json();
        this.espace_employe_salle = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    },

    async fetchavis() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-employe-avis');
        const data = await response.json();
        this.espace_employe_avis = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
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

    async supprimerAvis(idAvis) {
      try {
        const response = await fetch(`http://localhost:3001/api/supprimer-avis`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: idAvis })
        });

        if (!response.ok) {
          throw new Error('La suppression de l\'avis a échoué');
        }

        // Mettre à jour la liste des avis après la suppression
        await this.fetchavis();
        alert('Avis supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'avis :', error);
        alert('Une erreur est survenue lors de la suppression de l\'avis');
      }
    },

    async accepterAvis(idAvis) {
      try {
        // Mettre à jour le statut de l'avis dans la base de données
        // Assurez-vous que votre API met à jour la propriété 'accepte' dans la base de données
        // Cette étape doit être effectuée côté serveur

        // Mettre à jour l'interface utilisateur après l'acceptation de l'avis
        const avisIndex = this.espace_employe_avis.findIndex(avi => avi.id_avis === idAvis);
        if (avisIndex !== -1) {
          // Supprimer l'avis de la liste pour ne plus l'afficher
          this.espace_employe_avis.splice(avisIndex, 1);
        }
        alert('Avis accepté avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'acceptation de l\'avis :', error);
        alert('Une erreur est survenue lors de l\'acceptation de l\'avis');
      }
    }

  },
  computed: {
    avisNonAcceptes() {
      // Filtrer les avis qui ne sont pas encore acceptés
      return this.espace_employe_avis.filter(avi => !avi.accepte);
    }
  },


  mounted() {
    this.fetchfilms();
    this.fetchsalles();
    this.fetchavis();
  }
};