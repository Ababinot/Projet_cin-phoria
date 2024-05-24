
export default {
  props: ['titre', 'description', 'rating'],

  data() {
    return {
      films: [],
      
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

        console.log('Films data:', data);  // Debug
        data.forEach(film => {
          console.log('Image du film:', film.image);
        });

        this.films = data;
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },
  },

  mounted() {
    this.fetchFilms();
  }
};
