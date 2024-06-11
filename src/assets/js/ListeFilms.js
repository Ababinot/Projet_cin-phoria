import moment from 'moment';
import 'moment/locale/fr';

export default {
  props: ['titre', 'description', 'rating'],

  data() {
    return {
      seances: [],
      films: [],
      selectedFilm: -1,
      selectedSeance: -1,
      selectedSalle: -1,
      filteredSeances: [],
      filteredFilms: [],
      cinemas: [],
      genres: [],
      dates: [],
      selectedCinema: '',
      selectedGenre: '',
      selectedDate: ''
    };
  },

  methods: {
    reserver() {
      // Redirige vers la page de réservation
      this.$router.push('/reserver');
    },
    filtre() {
      // Filtrer les séances en fonction des critères sélectionnés
      this.filteredSeances = this.seances.filter(seance => {
        return (
          (this.selectedCinema === '' || seance.nom_cinema === this.selectedCinema) &&
          (this.selectedGenre === '' || seance.genre === this.selectedGenre) &&
          (this.selectedDate === '' || moment(seance.date).format('YYYY-MM-DD') === this.selectedDate)
        );
      });

      
    
      // Si aucun critère de filtrage n'est sélectionné, afficher tous les films
      if (this.selectedCinema === '' && this.selectedGenre === '' && this.selectedDate === '') {
        this.filteredFilms = [...this.films]; // Afficher tous les films
        return; // Sortir de la méthode
      }
    
      // Filtrer les films en fonction des critères sélectionnés
      this.filteredFilms = this.films.filter(film => {
        // Vérifier si le film a au moins une séance correspondant aux critères sélectionnés
        return this.filteredSeances.some(seance => seance.nom_film === film.titre);
      });
    
      // Vérifier s'il y a des films filtrés
      if (this.filteredFilms.length === 0) {
        // Aucun film ne correspond aux critères, réinitialiser filteredFilms
        this.filteredFilms = [];
      }
    },
    

    

    formatDescription(description) {
      if (description.length > 100) {
        return description.substring(0, 100) + '...';
      }
      return description;
    },

    async openPopup(filmIndex) {
      this.selectedFilm = this.filteredFilms[filmIndex];
      const filmName = this.selectedFilm.titre;
    
      // Filtrer les séances en fonction du nom du film sélectionné
      this.filteredSeances = this.seances.filter(seance => seance.nom_film === filmName);
    
      this.$refs.popup.showModal();
    },
    

    closePopup() {
      this.selectedFilm = null;
      this.filteredSeances = [];
      this.$refs.popup.close();
    },
    

    async fetchFilms() {
      try {
        const response = await fetch('http://localhost:3001/api/films');
        const data = await response.json();
        this.films = data;
        this.genres = [...new Set(data.map(film => film.genre))];
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },

    async fetchSeances() {
      try {
        const responseSeances = await fetch('http://localhost:3001/api/seances');

        // Récupérer les données des séances
        const seancesData = await responseSeances.json();
        this.seances = seancesData;
        this.dates = [...new Set(seancesData.map(seance => moment(seance.date).format('YYYY-MM-DD')))];
      } catch (error) {
        console.error('Erreur lors de la récupération des séances :', error);
      }
    },

    async fetchSeances_cinema_film_filtre() {
      try {
        const responseSeances = await fetch('http://localhost:3001/api/seances/filtre');

        // Récupérer les données des séances filtrées par cinéma et genre
        const seancesData = await responseSeances.json();
        this.seances = seancesData;

        // Extraire les options uniques pour les cinémas et genres
        this.cinemas = [...new Set(seancesData.map(seance => seance.nom_cinema))];
        
        this.dates = [...new Set(seancesData.map(seance => moment(seance.date).format('YYYY-MM-DD')))];
      } catch (error) {
        console.error('Erreur lors de la récupération des séances :', error);
      }
    },

    formatDate(dateString) {
      moment.locale('fr');
      return moment(dateString).format('LL');
    },

    
    async fetchSeancesByFilmName(filmName) {
      try {
        const response = await fetch(`http://localhost:3001/api/seances?nom_film=${encodeURIComponent(filmName)}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur lors de la récupération des séances :', error);
        return [];
      }
    },
  },

  mounted() {
    this.fetchFilms(); // Récupérer les films lors du montage du composant
    this.fetchSeances(); // Récupérer les séances lors du montage du composant
    this.fetchSeances_cinema_film_filtre(); // Récupérer les séances filtrées lors du montage du composant
  },
  
  
};
