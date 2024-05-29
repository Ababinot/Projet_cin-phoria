<template>
  <nav>
    <img src="@/assets/logo.png" alt="Logo de l'application" class="logo" />
    <div class="links">
      <router-link class="link" to="/">Accueil</router-link>
      <router-link class="link" to="/films">Films</router-link>
      <router-link class="link" to="/reserver">Réserver</router-link>
      <router-link class="link" to="/contact">Contact</router-link>
    </div>
    <div class="buttons">
      <template v-if="isLoggedIn">
        <button class="button-empty" @click="goToAccount">
          Mon compte <i class="fa fa-user" aria-hidden="true"></i>
        </button>
        <button class="button-empty" @click="logout">
          Déconnexion
        </button>
      </template>
      <template v-else>
        <button class="button-empty" @click="handleClick">
          Se connecter <i class="fa fa-user" aria-hidden="true"></i>
        </button>
        <button class="button-solid" @click="reserver">
          Réserver
        </button>
      </template>
    </div>
  </nav>
</template>

<script>
import NavBarMenuData from '@/assets/js/NavBarMenu.js'; // Importation des données exportées depuis PageAccueil.js
export default {
  name: 'NavBarMenu',
  methods: NavBarMenuData.methods, // Utilisation des méthodes exportées
  computed: NavBarMenuData.computed, // Utilisation des computed exportées
};
</script>

<style scoped>
@import '@/assets/styles/NavBarMenu.css';
</style>
