<template>
    <div class="contact">
      <h1>Contactez-nous</h1>
      
      <!-- Champ Nom (facultatif) -->
      <div class="input-group">
        <label for="nom">Nom</label>
        <input type="text" id="nom" v-model="nom" placeholder="Entrez votre nom (facultatif)" />
      </div>
      
      <!-- Champ Titre de la demande -->
      <div class="input-group">
        <label for="titre">Titre de la demande</label>
        <input type="text" id="titre" v-model="titre" placeholder="Entrez le titre de votre demande" required />
      </div>
      
      <!-- Champ Description -->
      <div class="input-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" placeholder="" rows="8" cols="80" required></textarea>
      </div>
      
      <!-- Bouton Envoyer -->
      <button class="buttonCo" @click="envoyer">Envoyer</button>
    </div>
  </template>

<script>
import ContactInfoData from '@/assets/js/ContactInfo.js'; // Importation des données exportées depuis PageAccueil.js
export default {
    name: 'ContactUser',
    data() {
        return ContactInfoData.data(); // Utilisation des données exportées
    },
    methods: ContactInfoData.methods, // Utilisation des méthodes exportées
};
</script>

<style scoped>
@import '@/assets/styles/ContactInfo.css';
</style>