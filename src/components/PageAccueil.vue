<template>
  <div class="page-accueil">
    <!-- Premier bloc -->
    <div class="content">
      <div class="text">
        <h1>Cinéphoria votre référence cinématographique</h1>
        <p>Découvrez une sélection de films captivants</p>
      </div>
      <div class="image">
        <img src="@/assets/accueil.jpg" alt="image d'accueil" class="img-accueil" />
      </div>
    </div>

    <!-- Deuxième bloc -->
    <div class="second-block">
      <div class="left">
        <h5>Films</h5>
        <h1>Nos derniers films</h1>
        <p>Retrouvez tout nos derniers films depuis mercredi dernier</p>
      </div>
      <div class="right">
        <button @click="voirTousLesFilms">Voir tous les films</button>
      </div>
    </div>

    <!-- Troisième bloc (carrousel d'images) -->
    <div>
      <div class="carousel">
        <div class="slide-container" ref="slideContainer">
          <!-- Dupliquer les éléments de films pour un carrousel infini -->
          <div v-for="(film, index) in duplicatedFilms" :key="index" class="slide">
            <img :src="film.image" :alt="'Description de l\'image ' + (index + 1)" class="carousel-img" />
            <h3>{{ film.name }}</h3>
            <p>{{ film.description }}</p>
          </div>
        </div>
        <!-- Pagination avec des petits points -->
        <div class="pagination">
          <span v-for="(film, index) in films" :key="index" :class="{ active: index === currentPage }"
            @click="goToPage(index)"></span>
        </div>
      </div>

    </div>


    <!-- Quatrième bloc -->
    <!-- Quatrième bloc -->
    <div class="content fourth-block">
      <div class="left-4">
        <h5>Réserver</h5>
        <h1>Réserver ma séance</h1>
        <p>Vous pouvez réserver votre séance en choisissant votre film ainsi que votre horaire</p>
        <button @click="voirSeancesDisponibles">Voir les séances disponibles</button>
      </div>
      <div class="image">
        <img src="@/assets/accueil2.jpg" alt="image d'accueil2" class="img-accueil" />
      </div>
    </div>

  </div>
</template>

<script>
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
</script>

<style scoped>
/* Vos styles CSS */
.page-accueil {
  text-align: center;
}

.content {
  display: flex;
  align-items: center;
  padding: 6rem;
}

.image {
  max-width: 50%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: hidden;
}

.img-accueil {
  width: 100%;
  height: auto;
}

.text {
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  margin-right: 2rem;
}

.text h1 {
  font-size: 4rem;
}

.text p {
  font-size: 1rem;
}

/* Nouveau bloc ajouté */
.second-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem;
}

.left {
  text-align: left;
}

.left h5 {
  font-size: 1.5rem;
}

.left h1 {
  font-size: 2rem;
}

.left p {
  font-size: 1rem;
}

.right button {
  background-color: #5B2333;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Style pour le carrousel d'images */
.carousel {
  margin-top: 3rem;
  position: relative;
  margin-bottom: 3rem;
  overflow: hidden;
  /* Cache les éléments qui dépassent du carrousel */
}

.slide-container {
  display: inline-block;
  /* Permet d'aligner les éléments sur la même ligne */
  white-space: nowrap;
  /* Empêche le retour à la ligne */
}

.slide {
  display: inline-block;
  /* Aligne les éléments sur la même ligne */
  vertical-align: top;
  /* Aligne les éléments en haut */
  margin-right: 20px;
  /* Espacement entre les éléments */
}

.carousel-img {
  max-width: 210px;
  /* Largeur maximale pour les images */
  height: auto;
  /* Hauteur ajustée automatiquement */
}

.slide h3 {
  margin-top: 1rem;
}

.slide p {
  margin-top: 0.5rem;
}

/* Style pour la pagination */
.pagination {

  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

}

.pagination span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.pagination span.active {
  background-color: #333;
}


/* Styles pour le quatrième bloc */


.left-4 {
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  padding-right: 2rem;
  /* Ajoute un espace entre le texte et l'image */
}

.left-4 h5 {
  font-size: 1.5rem;
}

.left-4 h1 {
  font-size: 2rem;
}

.left-4 p {
  font-size: 1rem;
}

.left-4 button {
  background-color: #5B2333;
  /* Couleur de fond primaire */
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Styles pour le quatrième bloc */
.fourth-block {
  background-color: var(--couleur-secondaire); /* Couleur de fond */
}

</style>
