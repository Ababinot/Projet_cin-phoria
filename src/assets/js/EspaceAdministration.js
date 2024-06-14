import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      espace_administration_film: [],
      espace_administration_salle: [],
      espace_administration_avis: [],
      espace_administration_reservation_film: [],
      email: '',
      nom: '',
      prenom: '',
      password: '',
      confirmPassword: '',
      updateEmail: '',
      updatePassword: '',

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
      },
      nouvelleSalle: {
        num_salle: null,
        capacite: null,
        type_projection: '',
        id_cinema: null
      },
      salleModif: {
        id_salle: null,
        num_salle: null,
        capacite: null,
        type_projection: '',
        id_cinema: null,
      },
    };

  },
  methods: {
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
    fermerDialogModifSalle() {
      this.$refs.dialogModifSalle.close();
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
        const response = await fetch('http://localhost:3001/api/espace-administration-film');
        const data = await response.json();
        this.espace_administration_film = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },

    async fetchsalles() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-administration-salle');
        const data = await response.json();
        this.espace_administration_salle = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    },
    async fetchreservation_film() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-administration-nbreservation');
        const data = await response.json();
        this.espace_administration_reservation_film = data;

      } catch (error) {
        console.error('Erreur lors de la récupération des nbreservation_film :', error);
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

    createChart() {
      const ctx = document.getElementById('reservationChart').getContext('2d');
      const films = this.espace_administration_reservation_film.map(film => film.nom_film);
      const reservations = this.espace_administration_reservation_film.map(film => film.nombre_reservations);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: films,
          datasets: [{
            label: 'Nombre de réservations',
            data: reservations,
            backgroundColor: 'rgba(91,35,51)',
            borderColor: 'rgba(86,77,74)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },

    validatePassword(password) {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return regex.test(password);
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    inscription() {
      console.log('Données d\'inscription envoyées :', {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        confirmPassword: this.confirmPassword
      });

      if (!this.email || !this.nom || !this.prenom || !this.password || !this.confirmPassword) {
        alert('Tous les champs doivent être remplis');
        return;
      }

      if (!this.validateEmail(this.email)) {
        alert('Adresse email invalide');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }

      if (!this.validatePassword(this.password)) {
        alert('Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.');
        return;
      }

      const userData = {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        verif_password: this.confirmPassword
      };

      console.log('Données envoyées au serveur :', userData);

      fetch('http://localhost:3001/api/inscriptionEmploye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              try {
                const json = JSON.parse(text);
                throw new Error(json.error || 'Erreur lors de l\'inscriptionEmploye');
              } catch {
                throw new Error(text);
              }
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Réponse du serveur:', data);
          alert('Inscription réussie');
          // Rafraîchir la page après l'inscription réussie
          window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de l\'inscriptionEmploye:', error);
          alert('Une erreur est survenue lors de l\'inscriptionEmploye: ' + error);
        });
    },

    modifier() {
      if (!this.updateEmail || !this.updatePassword) {
        alert('Tous les champs doivent être remplis');
        return;
      }

      if (!this.validateEmail(this.updateEmail)) {
        alert('Adresse email invalide');
        return;
      }

      if (!this.validatePassword(this.updatePassword)) {
        alert('Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.');
        return;
      }

      const updateData = {
        email: this.updateEmail,
        password: this.updatePassword
      };

      console.log('Données de mise à jour envoyées au serveur :', updateData);

      fetch('http://localhost:3001/api/updateEmploye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              try {
                const json = JSON.parse(text);
                throw new Error(json.error || 'Erreur lors de la mise à jour');
              } catch {
                throw new Error(text);
              }
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Réponse du serveur:', data);
          alert('Mise à jour réussie');
          // Rafraîchir la page après la mise à jour réussie
          window.location.reload();
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour :', error);
          alert('Une erreur est survenue lors de la mise à jour : ' + error);
        });
    },

    handleError(message, error) {
      console.error(message, error);
      alert('Une erreur est survenue : ' + message);
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

    async fetchAllFilmsAndSalles() {
      try {
        const responseFilms = await fetch('http://localhost:3001/api/espace-administration-film');
        const dataFilms = await responseFilms.json();
        this.espace_administration_film = dataFilms;

        const responseSalles = await fetch('http://localhost:3001/api/espace-administration-salle');
        const dataSalles = await responseSalles.json();
        this.espace_administration_salle = dataSalles;

      } catch (error) {
        console.error('Erreur lors de la récupération des films ou des salles :', error);
      }
    },

    afficherDialogAjoutFilm() {
      this.$refs.dialogAjoutFilm.showModal();
    },

    afficherDialogAjoutSeance() {
      // Appel de la méthode pour récupérer tous les films et salles
      this.fetchAllFilmsAndSalles();
      // Afficher la boîte de dialogue pour ajouter une séance
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
  mounted() {
    this.fetchfilms();
    this.fetchsalles();
    this.fetchreservation_film().then(() => {
      this.createChart();
    });
    this.fetchCinemas();
  }
};
