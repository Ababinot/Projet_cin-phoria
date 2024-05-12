export default {
    data() {
      return {
        films: [
          { name: 'Nom du film 1', description: 'Description du film 1', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 2', description: 'Description du film 2', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 3', description: 'Description du film 3', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 4', description: 'Description du film 4', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 5', description: 'Description du film 5', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 6', description: 'Description du film 6', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 7', description: 'Description du film 7', image: require('@/assets/accueil.jpg') },
          { name: 'Nom du film 8', description: 'Description du film 8', image: require('@/assets/accueil.jpg') },
        ],
        currentPage: 0,
        intervalId: null, // Identifiant de l'intervalle pour le défilement automatique
        itemsPerPage: 4 // Nombre d'éléments par page
      };
    },
    computed: {
      // Duplication des éléments de films pour rendre le carrousel infini
      duplicatedFilms() {
        return this.films.concat(this.films);
      }
    },
    methods: {
      // Méthode pour faire défiler automatiquement les diapositives
      autoScroll() {
        this.intervalId = setInterval(() => {
          // Incrémenter la page actuelle pour passer à la suivante
          this.currentPage = (this.currentPage + 1) % Math.ceil(this.duplicatedFilms.length / this.itemsPerPage);
        }, 3000); // Défilement toutes les 3 secondes (3000 millisecondes)
      },
  
  
      // Méthode pour aller à une page spécifique
      goToPage(page) {
        // Arrêter le défilement automatique lorsqu'un point de pagination est cliqué
        clearInterval(this.intervalId);
  
        // Calculer la page réelle en fonction du nombre d'éléments par page
        const realPage = Math.floor(page / this.itemsPerPage);
  
        // Mettre à jour la page actuelle
        this.currentPage = realPage;
  
        // Redémarrer le défilement automatique après un court délai (par exemple, 5 secondes)
        setTimeout(() => {
          this.autoScroll();
        }, 2000); // Attendre 5 secondes avant de redémarrer le défilement automatique
      },
  
      voirTousLesFilms() {
        this.$router.push('/films');
      },
      voirSeancesDisponibles() {
        this.$router.push('/reserver');
      }
  
  
    },
    mounted() {
      // Démarrer le défilement automatique lorsque le composant est monté
      this.autoScroll();
    }
  };