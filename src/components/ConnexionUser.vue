<template>
  <div class="connexion">
    <div class="icon">
      <!-- Utilisation d'un icône Font Awesome -->
      <i class="fas fa-user"></i>
    </div>
    <h1>Connexion</h1>
    
    <div class="input-group">
      <input type="email" id="email" v-model="email" placeholder="E-mail" required />
    </div>
    <div class="input-group">
      <input type="password" id="password" v-model="password" placeholder="Mot de passe" required />
    </div>
    <button class="buttonCo" @click="connexion">Connexion</button>
    <div class="extra-info">
      <p class="liens">Pas encore inscrit ?<a href="/inscription"> Inscrivez-vous dès maintenant pour réserver</a></p>
      <p class="liens2">Mot de passe oublié ?<a href="#"> Cliquer et reçever un nouveau mot de passe sur votre e-mail</a></p>
    </div>
  </div>
</template>

<script>
import ConnexionUserData from '@/assets/js/ConnexionUser.js'; // Importation des données exportées depuis PageAccueil.js
export default {
  name: 'ConnexionUser',
  data() {
    return ConnexionUserData.data(); // Utilisation des données exportées
  },
  methods: ConnexionUserData.methods, // Utilisation des méthodes exportées
};
</script>

<style scoped>
@import '@/assets/styles/ConnexionUser.css';
</style>

