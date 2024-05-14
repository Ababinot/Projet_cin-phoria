<template>
  <div class="reserver">
    <div class="spacer1"></div>
    <h1>Réservation</h1>

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
        <label for="film">Film</label>
        <select id="film" v-model="film">
          <option value="film1">Film 1</option>
          <option value="film2">Film 2</option>
          <!-- Ajoutez d'autres options si nécessaire -->
        </select>
      </div>
    </div>


    <button class="buttonRecherche" @click="recherche">Rechercher</button>

    <div class="spacer1"></div>
    <p>Film 1</p>

    <div class="input-group">
      <select id="horraire" v-model="horraire">
        <optgroup label="Horaire"></optgroup>
        <option value="horraire1">00h00 - 00h00</option>
        <option value="horraire2">00h00 - 00h00</option>
        <!-- Ajoutez d'autres options si nécessaire -->
      </select>
    </div>

    <div class="input-group">
      <select id="qualite" v-model="qualite">
        <optgroup label="Qualité"></optgroup>
        <option value="qualite1">2D</option>
        <option value="qualite2">3D</option>
        <!-- Ajoutez d'autres options si nécessaire -->
      </select>
    </div>

    <div class="input-group">
      <select id="nbPlace" v-model="nbPlace">
        <optgroup label="Nombre de places"></optgroup>
        <option value="nbPlace1">1</option>
        <option value="nbPlace2">2</option>
        <!-- Ajoutez d'autres options si nécessaire -->
      </select>
    </div>

    <p>Numéro salle: 01</p>
    <p>Prix: 10€</p>

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
};
</script>

<style scoped>
@import '@/assets/styles/ReserverBillet.css';
</style>
