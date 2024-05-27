<template>
  <div class="page-accueil">

    <!-- Premier bloc -->
    <div class="contentA">
      <div class="text">
        <h1>Cinéphoria votre référence cinématographique</h1>
        <p>Découvrez une sélection de films captivants</p>
      </div>
      <div class="imageA">
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
        <button @click="film">Voir tous les films</button>
      </div>
    </div>

    <!-- Troisième bloc (carrousel d'images) -->
    <div>
      <div class="carousel">
        <div class="slide-container" ref="slideContainer">
          <div v-for="(film, index) in visibleFilms" :key="index" class="slide">
            <img :src="film.image" :alt="film.description" class="carousel-img" />
          </div>
        </div>
        <div class="pagination">
          <span v-for="(film, index) in films" :key="index" :class="{ active: index === currentPage }"
            @click="goToPage(index)"></span>
        </div>
      </div>
    </div>

    <!-- Quatrième bloc -->
    <div class="contentA fourth-block">
      <div class="left-4">
        <h5>Réserver</h5>
        <h1>Réserver ma séance</h1>
        <p>Vous pouvez réserver votre séance en choisissant votre film ainsi que votre horaire</p>
        <button @click="reserver">Voir les séances disponibles</button>
      </div>
      <div class="imageA">
        <img src="@/assets/accueil2.jpg" alt="image d'accueil2" class="img-accueil" />
      </div>
    </div>
  </div>
</template>

<script>
import PageAccueilData from '@/assets/js/PageAccueil.js'; // Importation des données exportées depuis PageAccueil.js
export default {
  name: 'PageAccueil',
  data() {
    return PageAccueilData.data(); // Utilisation des données exportées
  },
  computed: PageAccueilData.computed, // Utilisation des calculs exportés
  methods: PageAccueilData.methods, // Utilisation des méthodes exportées
  mounted() {
    PageAccueilData.mounted.call(this); // Appel de la méthode mounted exportée
  }
};
</script>

<style scoped>
@import '@/assets/styles/PageAccueil.css';
</style>
