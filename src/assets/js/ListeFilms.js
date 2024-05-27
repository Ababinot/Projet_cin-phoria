import moment from 'moment';
import 'moment/locale/fr';

export default {
  props: ['titre', 'description', 'rating'],

  data() {
    return {
      seances: [],
      films: [],
      salles: [],
      selectedFilm: -1,
      selectedSeance: -1,
      selectedSalle: -1,
      filteredSeances: [],
    };
  },

  methods: {
    filtre() {
      console.log('cinema', this.cinema);
      console.log('genre', this.genre);
    },

    formatDescription(description) {
      if (description.length > 100) {
        return description.substring(0, 100) + '...';
      }
      return description;
    },

    async openPopup(filmIndex) {
      const selectedFilm = this.films[filmIndex];
      const filmName = selectedFilm.titre;

      this.selectedFilm = selectedFilm;

      // Filtrer les séances en fonction du nom du film sélectionné
      this.filteredSeances = this.seances.filter(seance => seance.nom_film === filmName);

      this.$refs.popup.showModal();
    },


    closePopup() {
      this.selectedFilm = -1;
      this.filteredSeances = [];
      this.$refs.popup.close();
    },

    async fetchFilms() {
      try {
        const response = await fetch('http://localhost:3001/api/films');
        const data = await response.json();
        this.films = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },

    async fetchSeances() {
      try {
        const responseSeances = await fetch('http://localhost:3001/api/seances');

        // Récupérer les données des salles et des séances
        const seancesData = await responseSeances.json();
        this.seances = seancesData;
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
    this.fetchFilms();
    this.fetchSeances();
  },
};
