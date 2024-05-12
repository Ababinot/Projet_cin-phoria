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
      <button class="button-empty" @click="handleClick">
        Se connecter <i class="fa fa-user" aria-hidden="true"></i>
      </button>
      <button class="button-solid" @click="reserver">
        Réserver
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  
  methods: {
    handleClick() {
      this.$router.push('/connexion');
    },
    reserver() {
      this.$router.push('/reserver');
    }
  }
}


</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--couleur-secondaire);
}

.logo {
  margin-right: auto;
  width: 100px;
}

.links {
  margin-left: auto;
  display: flex;
  gap: 2.5rem;
  margin-right: auto;
}

.link {
  text-decoration: none;
  /* Supprimer les soulignements */
  color: black;
  /* Couleur par défaut */
  transition: transform 0.3s;
  /* Effet de transition pour le zoom */
}

.link:hover {
  color: var(--couleur-principale);
  /* Couleur au survol */
  transform: scale(1.1);
  /* Zoom au survol */
}

.link:active {
  text-decoration: none;
  /* Supprimer les soulignements au clic */
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  /* Espacement entre les boutons */
}

.button-empty {
  background-color: transparent;
  border: 2px solid #5B2333;
  border-radius: 5px;
  color: #5B2333;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.button-solid {
  background-color: #5B2333;
  color: var(--couleur-secondaire);
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
