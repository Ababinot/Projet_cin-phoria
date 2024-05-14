export default {

  props: ['titre', 'description', 'rating'],
 
  data() {
    return {
      cinema: '',
      genre: '',
      jour: '',
      titre:'Avengers',
      description:'Avengers est un film de super-héros américain écrit et réalisé par Joss Whedon, sorti en 2012. Il est basé du même nom (les Avengers) apparaissant dans le comic book publié par Marvel Comics. Il s\'agit du sixième film de l\'univers cinématographique Marvel, débuté en 2008, et du premier de la phase II.',
      rating: 4,
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
    }
  }
};