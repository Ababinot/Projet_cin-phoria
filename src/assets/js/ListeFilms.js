export default {
  props: ['titre', 'description', 'rating'],

  data() {
    return {
      films: [],
      cinema: '',
      genre: '',
      jour: '',
      minAge: 12,
      selectedFilmIndex: -1,
    };
  },

  methods: {
    filtre() {
      console.log('cinema', this.cinema);
      console.log('genre', this.genre);
    },

    formatDescription(description) {
      if (description.length > 130) {
        return description.substring(0, 130) + '...';
      }
      return description;
    },

    openPopup(index) {
      this.selectedFilmIndex = index;
      this.$refs.popup.showModal();
    },

    closePopup() {
      this.selectedFilmIndex = -1;
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
  },

  computed: {
    selectedFilmImage() {
      return this.selectedFilmIndex !== -1 ? this.films[this.selectedFilmIndex].image : ''; // Assurez-vous d'avoir l'image réelle du film
    }
  },

  mounted() {
    this.fetchFilms();
  }
};
