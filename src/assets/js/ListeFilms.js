export default {
 
  data() {
    return {
      cinema: '',
      genre: '',
      jour: '',
      titre:'Avengers',
      description:'Avengers est un',
      rating: 4,
    };
  },
  methods: {
    filtre() {
      console.log('cinema', this.cinema);
      console.log('genre', this.genre);
    },
  }
};