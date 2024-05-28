<template>
  <div class="reserver">
    <div class="spacer1"></div>
    <h1>Réservation</h1>

    <div class="input-row">
      <!-- Choix du cinéma -->
      <div class="input-group">
        <label for="cinema">Cinéma</label>
        <select id="cinema" v-model="selectedCinema">
          <option v-for="cinema in cinemas" :key="cinema" :value="cinema">{{ cinema }}</option>
        </select>
      </div>

      <div class="spacer"></div>

      <!-- Choix du film -->
      <div class="input-group">
        <label for="film">Film</label>
        <select id="film" v-model="selectedFilm">
          <option v-for="film in films" :key="film" :value="film">{{ film }}</option>
        </select>
      </div>
    </div>

    <button class="buttonRecherche" @click="recherche">Rechercher</button>

    <div class="spacer1"></div>

    <div class="input-group">
      <select id="film" v-model="filteredFilm">
        <optgroup label="Film">
          <option v-for="film in filteredFilms" :key="film" :value="film">{{ film }}</option>
        </optgroup>
      </select>
    </div>

    <div class="input-group">
      <select id="horraire" v-model="filteredHorraire">
        <optgroup label="Horaire">
          <option v-for="horraire in filteredHoraires" :key="horraire" :value="horraire">{{ horraire }}</option>
        </optgroup>
      </select>
    </div>

    <div class="input-group">
      <select id="qualite" v-model="filteredQualite">
        <optgroup label="Qualité">
          <option v-for="qualite in filteredQualites" :key="qualite" :value="qualite">{{ qualite }}</option>
        </optgroup>
      </select>
    </div>

    <div class="input-group">
      <select id="nbPlace" v-model="filteredNbPlace">
        <optgroup label="Nombre de personnes">
          <option v-for="place in filteredNbPlacesOptions" :key="place" :value="place">{{ place }}</option>
        </optgroup>
      </select>
    </div>

    <p>Numéro de la salle: {{ filteredNumeroSalle }}</p>
    <p>Prix: {{ prix }}€</p>

    <!-- Bouton de réservation -->
    <button class="buttonReserver" @click="reserver">Réserver</button>
  </div>
</template>

<script>
import ReserverBilletData from '@/assets/js/ReserverBillet.js'; // Importation des données exportées depuis PageAccueil.js
export default {
  name: 'ReserverBillet',
  data() {
    return ReserverBilletData.data(); // Utilisation des données exportées
  },
  methods: ReserverBilletData.methods, // Utilisation des méthodes exportées
  mounted() {
    this.fetch_vue_reservation(); // Appel de la méthode pour récupérer les cinémas lors du montage du composant
  },
  computed: ReserverBilletData.computed // Utilisation des propriétés calculées exportées
};
</script>

<style scoped>
@import '@/assets/styles/ReserverBillet.css';
</style>
