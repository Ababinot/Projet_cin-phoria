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
        <div class="liste-films">
            <div class="film_avis" v-for="avi in espace_administration_avis" :key="avi.id_avis">
                <h2>Avis sur ({{ avi.titre }})</h2>
                <p>{{ avi.commentaire }}</p>
                <button class="btn_modif" @click="accepterAvis">
                    Accepter <i class="fa-solid fa-circle-check"></i>
                </button>
                <button class="btn_supprimer" @click="supprimerAvis">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
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
    }
};
</script>

<style scoped>
@import '@/assets/styles/EspaceAdministration.css';
</style>