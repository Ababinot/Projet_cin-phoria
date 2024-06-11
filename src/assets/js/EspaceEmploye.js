export default {
  data() {
    return {

      nouveauFilm: {
        titre: '',
        description: '',
        image: '',
        genre: '',
        age_minimum: null,
      },
      espace_employe_film: [],
      espace_employe_salle: [],
      espace_employe_avis: [],

      nouvelleSeance: {
        date_debut: '',
        date_fin: '',
        id_film_seance: '',
        id_salle: ''
      },

      filmModif: {
        id_film: null,
        titre: '',
        description: '',
        image: '',
        genre: '',
        age_minimum: null
      }

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

    async supprimerFilm(titre_film) {
      try {
        const response = await fetch(`http://localhost:3001/api/supprimer-film`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ titre: titre_film })
        });

        if (!response.ok) {
          throw new Error('La suppression de Film a échoué');
        }


        await this.fetchfilms();
        alert('Film supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de Film :', error);
        alert('Une erreur est survenue lors de la suppression de Film');
      }
    },

    async accepterAvis(idAvis) {
      try {
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
    },

    afficherDialogAjoutFilm() {
      this.$refs.dialogAjoutFilm.showModal();
    },

    afficherDialogAjoutSeance() {
      this.$refs.dialogAjoutSeance.showModal();
    },
    // Méthode pour fermer la boîte de dialogue d'ajout de film
    fermerDialogAjoutFilm() {
      this.$refs.dialogAjoutFilm.close();
    },

    fermerDialogAjoutSeance() {
      this.$refs.dialogAjoutSeance.close();
    },

    async ajouterFilm() {
      try {
        const response = await fetch('http://localhost:3001/api/ajouter-film', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') // Ajoutez le token dans l'en-tête
          },
          body: JSON.stringify(this.nouveauFilm),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Erreur de réponse:', errorResponse);
          throw new Error('Erreur lors de l\'ajout de film');
        }
        alert('Film ajouté avec succès');
        this.fermerDialogAjoutFilm();
        this.fetchfilms(); // Mettre à jour la liste des films après ajout
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film :', error);
        alert('Une erreur est survenue lors de l\'ajout du film');
      }
    },

    async ajouterSeance() {
      if (!this.nouvelleSeance.date_debut) {
        console.error('Champ manquant: date_debut');
        alert('Le champ date de début est requis.');
        return;
      }
      if (!this.nouvelleSeance.date_fin) {
        console.error('Champ manquant: date_fin');
        alert('Le champ date de fin est requis.');
        return;
      }
      if (!this.nouvelleSeance.id_film_seance) {
        console.error('Champ manquant: id_film_seance');
        alert('Le champ film est requis.');
        return;
      }
      if (!this.nouvelleSeance.id_salle) {
        console.error('Champ manquant: id_salle');
        alert('Le champ salle est requis.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/ajouter-seance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(this.nouvelleSeance),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Erreur de réponse:', errorResponse);
          throw new Error('Erreur lors de l\'ajout de seance');
        }
        alert('Séance ajoutée avec succès');
        this.fermerDialogAjoutSeance();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de seance :', error);
        alert('Une erreur est survenue lors de l\'ajout de la séance');
      }
    },

    async modifierFilm() {
      try {
        const response = await fetch(`http://localhost:3001/api/modifier-film/${this.filmModif.id_film}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(this.filmModif),
        });
        if (!response.ok) {
          throw new Error('La modification du film a échoué');
        }
        alert('Film modifié avec succès');
        this.fermerDialogModificationFilm();
        this.fetchfilms();
      } catch (error) {
        console.error('Erreur lors de la modification du film :', error);
        alert('Une erreur est survenue lors de la modification du film');
      }
    },
    // Méthode pour fermer la boîte de dialogue de modification de film
    fermerDialogModificationFilm() {
      this.$refs.dialogModificationFilm.close();
    },

    // Méthode pour ouvrir la boîte de dialogue de modification de film
    async afficherDialogModificationFilm(titre) {
      console.log('Afficher la boîte de dialogue de modification du film', titre);
      try {
        if (!titre) {
          throw new Error('Le titre du film est manquant');
        }
        const response = await fetch(`http://localhost:3001/api/espace-employe-film/${titre}`);
        if (!response.ok) {
          throw new Error('La récupération des détails du film pour modification a échoué');
        }
        const film = await response.json();
        if (!film) {
          throw new Error('Aucun film trouvé avec cet identifiant');
        }
        // Mettre à jour les détails du film à modifier dans filmModif
        this.filmModif = { ...film };
        // Ouvrir la boîte de dialogue de modification du film
        this.$refs.dialogModificationFilm.showModal();
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film pour modification :', error);
        alert('Une erreur est survenue lors de la récupération des détails du film pour modification');
      }
    },



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