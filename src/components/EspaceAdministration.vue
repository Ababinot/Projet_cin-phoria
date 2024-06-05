<template>
    <div class="espace-employe">
        <h1>Intranet Films/séances</h1>
        <p>Créer/modifier/supprimer les films ainsi que les séances </p>
        <button class="btn_ajout" @click="ajouterFilm">Ajouter un film</button>
        <div class="liste-films">
            <div class="film" v-for="film in espace_administration_film" :key="film.titre">
                <h2>{{ film.titre }}</h2>
                <button class="btn_modif" @click="modifierFilm">
                    Modifier <i class="fa fa-pencil"></i>
                </button>
                <button class="btn_supprimer" @click="modifierFilm">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
        <h1>Intranet Salles</h1>
        <p>Modifier/supprimer et concevoir les salles qui seront utilisées pour les séances </p>
        <button class="btn_ajout" @click="ajouterSalle">Ajouter une salle</button>
        <div class="liste-films">
            <div class="film" v-for="salle in espace_administration_salle" :key="salle.num_salle">
                <h2>Salle n°{{ salle.num_salle }}</h2>
                <button class="btn_modif" @click="modifierSalle">
                    Modifier <i class="fa fa-pencil"></i>
                </button>
                <button class="btn_supprimer" @click="supprimerSalle">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
        <h1>Administration Employé</h1>
        <p>Concevoir un compte «employé» en fournissant un login et mot de passe </p>
        <div class="creation_employe">
            <div class="icon">
                <i class="fa-regular fa-user"></i>
            </div>
            <h3>Compte employé</h3>
            <div class="input-group">
                <input type="email" id="email" v-model="email" placeholder="E-mail" required />
            </div>
            <div class="input-group">
                <input type="password" id="password" v-model="password" placeholder="Mot de passe" required />
            </div>
            <button class="buttonCo" @click="connexion">Créer</button>
            <div class="input-group">
                <input type="email" id="email" v-model="email" placeholder="E-mail" required />
            </div>
            <div class="input-group">
                <input type="password" id="password" v-model="password" placeholder="Nouveau mot de passe" required />
            </div>
            <button class="buttonCo" @click="connexion">Modifier</button>
        </div>
        <h1>Nombre de réservation par films</h1>
        <p>Visualiser le nombre de réservations par film sur une période de 7 jours via un Dashboard</p>
        <div class="nb_reservation_film">
            <canvas id="reservationChart"></canvas>
        </div>
    </div>
</template>





<script>
import EspaceAdministrationData from '@/assets/js/EspaceAdministration.js';

export default {
    data() {
        return EspaceAdministrationData.data();
    },
    computed: EspaceAdministrationData.computed,
    methods: EspaceAdministrationData.methods,
    mounted() {
        this.fetchfilms();
        this.fetchsalles();
        this.fetchreservation_film().then(() => {
            this.createChart();
        });

    }
};
</script>

<style scoped>
@import '@/assets/styles/EspaceAdministration.css';
</style>