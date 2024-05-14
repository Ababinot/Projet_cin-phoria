export default {
    data() {
      return {
        cinema: '',
        genre: '',
        jour: '',
      };
    },
    methods: {
        filtre() {
        console.log('cinema', this.cinema);
        console.log('genre', this.genre);
      },
    }
  };