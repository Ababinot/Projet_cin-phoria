export default {
  data() {
    return {
      salleModif: {
        id_salle: null,
        num_salle: null,
        capacite: null,
        type_projection: '',
        id_cinema: null,
      },
      nouvelleSalle: {
        num_salle: null,
        capacite: null,
        type_projection: '',
        id_cinema: null
      },

      nouveauFilm: {
        titre: '',
        description: '',
        image: '',
        genre: '',
        age_minimum: null,
      },
      cinemas: [],
      espace_employe_film: [],
      espace_employe_salle: [],
      espace_employe_avis: [],
      seancesParFilm: {},

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
    async fetchSalleCinema() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-employe-salle');
        const data = await response.json();
        this.espace_employe_salle = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des salles de cinéma :', error);
      }
    },
    fermerDialogModifSalle() {
      this.$refs.dialogModifSalle.close();
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

    async afficherDialogModifSalle(id_salle) {
      console.log('Afficher la boîte de dialogue de modification du salle', id_salle);
      try {
        if (!id_salle) {
          throw new Error('Le id du salle est manquant');
        }
        const responseSalle = await fetch(`http://localhost:3001/api/espace-employe-salle/${id_salle}`);
        if (!responseSalle.ok) {
          throw new Error('La récupération des détails du film pour modification a échoué');
        }
        const salle = await responseSalle.json();
        if (!salle) {
          throw new Error('Aucun salle trouvé avec ce id');
        }
        // Assigner l'ID du film récupéré à filmModif
        this.salleModif.id_salle = salle.id_salle;
        // Préremplir les détails du film dans l'objet filmModif
        this.salleModif.num_salle = salle.num_salle;
        this.salleModif.capacite = salle.capacite;
        this.salleModif.type_projection = salle.type_projection;
        this.salleModif.id_cinema = salle.id_cinema;
        // Ouvrir la boîte de dialogue de modification de film
        this.$refs.dialogModifSalle.showModal();
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film pour modification :', error);
        alert('Une erreur est survenue lors de la récupération des détails du film pour modification');
      }
    },
    
    async modifierSalle() {
      try {
        const response = await fetch(`http://localhost:3001/api/modifier-salle/${this.salleModif.id_salle}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(this.salleModif),
        });
        if (!response.ok) {
          throw new Error('La modification du salle a échoué');
        }
        alert('Salle modifié avec succès');
        this.fermerDialogModifSalle();
        this.fetchsalles();
      } catch (error) {
        console.error('Erreur lors de la modification du salle :', error);
        alert('Une erreur est survenue lors de la modification du szalle');
      }
    },
    

    async fetchCinemas() {
      try {
        const response = await fetch('http://localhost:3001/api/cinema');
        const data = await response.json();
        this.cinemas = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des cinémas :', error);
      }
    },
    async fetchfilms() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-employe-film');
        const data = await response.json();
        this.espace_employe_film = data;

        // Appeler une méthode pour récupérer les séances pour chaque film
        await this.fetchSeancesParFilm();
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },
    async fetchSeancesParFilm() {
      try {
        for (const film of this.espace_employe_film) {
          const responseSeances = await fetch(`http://localhost:3001/api/espace-employe-film/${film.id_film}/seances`);
          const seances = await responseSeances.json();
          this.$set(this.seancesParFilm, film.id_film, seances);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des séances par film :', error);
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
    async supprimerSalle(idSalle) {
      try {
        console.log("ID de salle à supprimer :", idSalle); // Vérifiez ici si l'identifiant est correctement passé
        const response = await fetch(`http://localhost:3001/api/supprimer-salle`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ idSalle: idSalle }) // Utilisez la clé idSalle au lieu de id
        });

        if (!response.ok) {
          throw new Error('La suppression de Salle a échoué');
        }

        await this.fetchsalles();
        alert('Salle supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de Salle :', error);
        alert('Une erreur est survenue lors de la suppression de Salle');
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
        const responseFilm = await fetch(`http://localhost:3001/api/espace-employe-film/${titre}`);
        if (!responseFilm.ok) {
          throw new Error('La récupération des détails du film pour modification a échoué');
        }
        const film = await responseFilm.json();
        if (!film) {
          throw new Error('Aucun film trouvé avec ce titre');
        }
        // Assigner l'ID du film récupéré à filmModif
        this.filmModif.id_film = film.id_film;
        // Préremplir les détails du film dans l'objet filmModif
        this.filmModif.titre = film.titre;
        this.filmModif.description = film.description;
        this.filmModif.image = film.image;
        this.filmModif.genre = film.genre;
        this.filmModif.age_minimum = film.age_minimum;
        // Ouvrir la boîte de dialogue de modification de film
        this.$refs.dialogModificationFilm.showModal();
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du film pour modification :', error);
        alert('Une erreur est survenue lors de la récupération des détails du film pour modification');
      }
    },

    afficherDialogAjoutSalle() {
      this.$refs.dialogAjoutSalle.showModal();
    },
    fermerDialogAjoutSalle() {
      this.$refs.dialogAjoutSalle.close();
    },
    async ajouterSalle() {
      try {
        const response = await fetch('http://localhost:3001/api/ajouter-salle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') // Ajoutez le token dans l'en-tête
          },
          body: JSON.stringify(this.nouvelleSalle),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Erreur de réponse:', errorResponse);
          throw new Error('Erreur lors de l\'ajout de salle');
        }
        alert('Salle ajouté avec succès');
        this.fermerDialogAjoutSalle();
        this.fetchsalles();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du salle :', error);
        alert('Une erreur est survenue lors de l\'ajout du salle');
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
    this.fetchCinemas();
    this.fetchSalleCinema();
  }
};