

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
      return (basePrice + qualityPrice) * numberOfPlaces;
    }
  },

  methods: {
    reserver() {
      // Votre logique de réservation
    },
    async fetch_vue_reservation() {
      try {
        const responseReservation = await fetch('http://localhost:3001/api/reservation');
        const reservationData = await responseReservation.json();
        this.reservation = reservationData;

        // Extraire les options uniques pour les cinémas et les films
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