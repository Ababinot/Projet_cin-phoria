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
  },

  decodeJwt(token) {
      // Fonction pour décoder le token JWT
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);

        console.log('Token JWT décodé :', decodedToken);

        return decodedToken;
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
      }
    },

  mounted() {
    this.startInactivityTimer();
    window.addEventListener('mousemove', this.resetInactivityTimer);
    window.addEventListener('keypress', this.resetInactivityTimer);
    window.addEventListener('click', this.resetInactivityTimer);
    window.addEventListener('scroll', this.resetInactivityTimer);
  },
  beforeUnmount() {
    this.clearInactivityTimer();
    window.removeEventListener('mousemove', this.resetInactivityTimer);
    window.removeEventListener('keypress', this.resetInactivityTimer);
    window.removeEventListener('click', this.resetInactivityTimer);
    window.removeEventListener('scroll', this.resetInactivityTimer);
  },
  methods: {
    startInactivityTimer() {
      this.inactivityTimer = setTimeout(this.logout, 300000); // 5 minutes d'inactivité
    },
    resetInactivityTimer() {
      clearTimeout(this.inactivityTimer);
      this.startInactivityTimer();
    },
    clearInactivityTimer() {
      clearTimeout(this.inactivityTimer);
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/connexion');
      window.location.reload();
    }
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
