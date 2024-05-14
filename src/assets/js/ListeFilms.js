export default {

  props: ['titre', 'description', 'rating'],

  data() {
    return {
      cinema: '',
      genre: '',
      jour: '',
      minAge: 12,
      isFavorite: this.rating === 5,
      filmImages: ['assets/accueil.jpg', 'assets/accueil1.jpg', 'assets/accueil.jpg', 'assets/accueil2.jpg', 'assets/accueil.jpg', 'assets/accueil2.jpg', 'assets/accueil.jpg'],
      titles: ['Titre 1', 'Titre 2', 'Titre 3', 'Titre 4', 'Titre 5', 'Titre 6', 'Titre 7', 'Titre 8'],
      descriptions: ['Description 1', 'Description 2', 'Description 3', 'Description 4', 'Description 5', 'Description 6', 'Description 7', 'Description 8'],
      ratings: [3, 4, 5, 3, 4, 5, 3, 4],
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
      this.$refs.popup.close();
    },
  },

  computed: {
    selectedFilmImage() {
      return this.filmImages[this.selectedFilmIndex];
    },
    selectedFilmTitle() {
      return this.titles[this.selectedFilmIndex];
    },
    selectedFilmDescription() {
      return this.descriptions[this.selectedFilmIndex];
    },
    selectedFilmRating() {
      return this.ratings[this.selectedFilmIndex];
    },
    isFavorite() {
      return this.selectedFilmIndex === 1; // Example of checking if it's a favorite film
    }
  }
};