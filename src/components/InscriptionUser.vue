<template>
    <div class="connexion">
        <div class="icon">
            <!-- Utilisation d'un icône Font Awesome -->
            <i class="fas fa-user"></i>
        </div>
        <h1>Inscription</h1>

        <div class="input-group">
            <input type="email" id="email" v-model="email" placeholder="E-mail" required />
        </div>
        <div class="input-group">
            <input type="text" id="nom" v-model="nom" placeholder="Nom" required />
        </div>
        <div class="input-group">
            <input type="text" id="prenom" v-model="prenom" placeholder="Prénom" required />
        </div>
        <div class="input-group">
            <input type="text" id="username" v-model="username" placeholder="Nom d'utilisateur" required />
        </div>
        <div class="input-group">
            <input type="password" id="password" v-model="password" placeholder="Mot de passe" required />
        </div>
        <button class="buttonCo" @click="inscription">Inscription</button>
    </div>
</template>

<script>
import InscriptionUserData from '@/assets/js/InscriptionUser.js'; // Importation des données exportées depuis PageAccueil.js
export default {
    name: 'InscriptionUser',
    data() {
        return InscriptionUserData.data(); // Utilisation des données exportées
    },
    methods: InscriptionUserData.methods, // Utilisation des méthodes exportées
};
</script>

<style scoped>
@import '@/assets/styles/ConnexionUser.css';
</style>