export default {
  data() {
    return {
      films: [],
      currentPage: 0,
      intervalId: null,
      itemsPerPage: 9,
      currentFilmIndex: 0
    };
  },

  computed: {
    visibleFilms() {
      const start = this.currentFilmIndex;
      const end = start + this.itemsPerPage;
      return this.duplicatedFilms.slice(start, end);
    },
    duplicatedFilms() {
      return this.films.concat(this.films);
    }
  },


  methods: {
    autoScroll() {
      this.intervalId = setInterval(() => {
        // Augmenter l'index du film courant
        this.currentFilmIndex = (this.currentFilmIndex + 1) % this.films.length;
      }, 3000);
    },
    goToPage(page) {
      clearInterval(this.intervalId);
      this.currentFilmIndex = page;
      setTimeout(() => {
        this.autoScroll();
      }, 2000);
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

    reserver() {
      this.$router.push('/reserver');
    },

    film(){
      this.$router.push('/films');
    }
  },
  mounted() {
    this.autoScroll();
    this.fetchFilms();
  }
};
