<template>
  <div id="app">
    <NavbarMenu />
    <router-view />
    <FooterBar />
    
  </div>
</template>

<script>
import NavbarMenu from './components/NavbarMenu.vue';
import FooterBar from './components/FooterBar.vue';

export default {
  components: {
    NavbarMenu,
    FooterBar
  }
};
</script>

<style>
:root {
  --couleur-principale: #5B2333; /* Couleur principale */
  --couleur-secondaire: #F7F4F3; /* Deuxième couleur */
  --couleur-tertiaire: #564D4A; /* Troisième couleur */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
