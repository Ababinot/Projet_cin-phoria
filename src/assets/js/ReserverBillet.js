export default {
  data() {
    return {
      reservation: [],
      cinemas: [],
      films: [],
      selectedCinema: '',
      selectedFilm: '',
      filteredFilms: [],
      filteredFilm: '',
      filteredHoraires: [],
      filteredHorraire: '',
      filteredQualites: [],
      filteredQualite: '',
      filteredNbPlaces: [],
      filteredNbPlace: '',
      filteredNumeroSalles: [],
      filteredNumeroSalle: '',
      filteredNbPlacesOptions: [],
      horraire: null,
      qualite: null,
      nbPlace: null,
      nouvelleReservation: {
        date_reservation: '',
        nombre_personnes: '',
        prix_total: '',
        statut: 'En attente',
        id_seance: '',
        id_utilisateur_res: '',
      },
    };
  },
  computed: {
    prix() {
      let basePrice = 7;
      let qualityPrice = 0;
      switch (this.filteredQualite) {
        case '3D':
          qualityPrice = 3;
          break;
        case '4DX':
          qualityPrice = 4;
          break;
        case 'Dolby':
          qualityPrice = 5;
          break;
        default:
          qualityPrice = 0;
      }
      const numberOfPlaces = parseInt(this.filteredNbPlace) || 0;
      this.nouvelleReservation.prix_total = (basePrice + qualityPrice) * numberOfPlaces;
      return this.nouvelleReservation.prix_total;
    }
  },
  methods: {
    reserver() {
      // Vérifie si tous les champs sont remplis
      if (
        !this.selectedCinema ||
        !this.selectedFilm ||
        !this.filteredFilm ||
        !this.filteredHorraire ||
        !this.filteredQualite ||
        !this.filteredNbPlace ||
        !this.filteredNumeroSalle ||
        !this.filteredNbPlace
      ) {
        alert('Veuillez remplir tous les champs avant de réserver.');
        return; 
      }
      if (localStorage.getItem('token')) {
       
        if (confirm('Confirmez-vous la réservation ?')) {
          this.ajouterReservation();
          console.log('Réservation confirmée');
        } else {
          
          console.log('Réservation annulée');
        }
      } else {
       
        this.$router.push('/connexion');
      }
    },
    async ajouterReservation() {
      try {
        this.decodeJwt(localStorage.getItem('token'));
        const user_id = localStorage.getItem('user_id');
        // Supprimer la lettre avant les chiffres dans l'ID utilisateur
        const cleaned_user_id = user_id.replace(/\D/g, '');
        if (!cleaned_user_id) {
          alert('Veuillez vous connecter pour effectuer une réservation');
          this.$router.push('/connexion');
          return;
        }
        // Recherche de la séance correspondante
        const seance = this.reservation.find(reservation => reservation.num_salle === this.filteredNumeroSalle);
        if (!seance) {
          alert('Séance non trouvée');
          return;
        }
        const reservationData = {
          date_reservation: seance.date, // Utilisation de la date de la séance
          heure_debut: seance.heure_debut, // Utilisation de l'heure de début de la séance
          nombre_personnes: this.filteredNbPlace,
          prix_total: this.prix,
          statut: 'Confirmée',
          id_seance: this.filteredNumeroSalle,
          id_utilisateur_res: cleaned_user_id, // Utilisez l'ID utilisateur nettoyé
        };
        const response = await fetch('http://localhost:3001/api/ajouter-reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') // Ajoutez le token dans l'en-tête
          },
          body: JSON.stringify(reservationData),
        });
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error('Erreur de réponse:', errorResponse);
          throw new Error('Erreur lors de l\'ajout de la réservation');
        }
        alert('Réservation ajoutée avec succès');
        window.location.reload();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la réservation :', error);
        alert('Une erreur est survenue lors de l\'ajout de la réservation');
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
        return decodedToken;
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
      }
    },
    async fetch_vue_reservation() {
      try {
        const responseReservation = await fetch('http://localhost:3001/api/reservation');
        const reservationData = await responseReservation.json();
        this.reservation = reservationData;
        this.cinemas = [...new Set(reservationData.map(reservation => reservation.nom_cinema))];
        this.films = [...new Set(reservationData.map(reservation => reservation.nom_film))];
      } catch (error) {
        console.error('Erreur lors de la récupération des séances :', error);
      }
    },
    recherche() {
      const filteredData = this.reservation.filter(
        reservation => reservation.nom_cinema === this.selectedCinema && reservation.nom_film === this.selectedFilm
      );
      this.filteredFilms = [...new Set(filteredData.map(reservation => reservation.nom_film))];
      this.filteredHoraires = [...new Set(filteredData.map(reservation => `${reservation.heure_debut} - ${reservation.heure_fin}`))];
      this.filteredQualites = [...new Set(filteredData.map(reservation => reservation.type_projection))];
      this.filteredNbPlaces = [...new Set(filteredData.map(reservation => reservation.capacite))];
      this.filteredNumeroSalles = [...new Set(filteredData.map(reservation => reservation.num_salle))];
      this.filteredNumeroSalle = this.filteredNumeroSalles.length > 0 ? this.filteredNumeroSalles[0] : '';
      if (this.filteredNbPlaces.length > 0) {
        const maxPlaces = Math.max(...this.filteredNbPlaces);
        this.filteredNbPlacesOptions = Array.from({ length: maxPlaces }, (_, i) => i + 1);
      } else {
        this.filteredNbPlacesOptions = [];
      }
    }
  },
  mounted() {
    this.fetch_vue_reservation();
  },
};
