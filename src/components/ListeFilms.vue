<template>
  <div class="liste-films">
    <div class="spacer1"></div>
    <h1>Films</h1>
    <div class="input-row">
      <!-- Choix du cinéma -->
      <div class="input-group">
        <label for="cinema">Cinéma</label>
        <select id="cinema" v-model="cinema">
          <option value="cinema1">Cinema 1</option>
          <option value="cinema2">Cinema 2</option>
          <!-- Ajoutez d'autres options si nécessaire -->
        </select>
      </div>

      <div class="spacer"></div>

      <!-- Choix du film -->
      <div class="input-group">
        <label for="genre">Genre</label>
        <select id="genre" v-model="genre">
          <option value="genre1">genre 1</option>
          <option value="genre2">genre 2</option>
          <!-- Ajoutez d'autres options si nécessaire -->
        </select>
      </div>

      <div class="spacer"></div>

      <!-- Choix du film -->
      <div class="input-group">
        <label for="jour">Jour</label>
        <select id="jour" v-model="jour">
          <option value="jour1">jour 1</option>
          <option value="jour2">jour 2</option>
          <!-- Ajoutez d'autres options si nécessaire -->
        </select>
      </div>
    </div>
    <button class="filtre" @click="filtre">Filtrer</button>
  </div>

  <div class="custom-card">
    <div class="image-container">
      <img src="@/assets/accueil2.jpg" alt="Image" />
    </div>
    <div class="content">
      <div class="line">
        <div class="title">{{ titre }}</div>
      </div>
      <div class="line">
        <div class="description">{{ formatDescription(description) }}</div>
      </div>
      <div class="line">
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star">{{ n <= rating ? '★' : '☆' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListeFilmsData from '@/assets/js/ListeFilms.js'; // Importation des données exportées depuis PageAccueil.js
export default {
  props: ListeFilmsData.props, // Utilisation des props exportées
  name: 'ListeFilms',
  data() {
    return ListeFilmsData.data(); // Utilisation des données exportées
  },
  methods: ListeFilmsData.methods, // Utilisation des méthodes exportées
};
</script>

<style scoped>
@import '@/assets/styles/ListeFilms.css';
</style>
