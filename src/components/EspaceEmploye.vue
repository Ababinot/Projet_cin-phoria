<template>
    <div class="espace-employe">
        <h1>Intranet Films/séances</h1>
        <p>Créer/modifier/supprimer les films ainsi que les séances </p>
        <button class="btn_ajout" @click="ajouterFilm">Ajouter un film</button>
        <div class="liste-films">
            <div class="film" v-for="film in espace_employe_film" :key="film.titre">
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
            <div class="film" v-for="salle in espace_employe_salle" :key="salle.num_salle">
                <h2>Salle n°{{ salle.num_salle }}</h2>
                <button class="btn_modif" @click="modifierSalle">
                    Modifier <i class="fa fa-pencil"></i>
                </button>
                <button class="btn_supprimer" @click="supprimerSalle">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
        <h1>Supprimer/valider les avis sur un film</h1>
        <p>Supprimer/valider les avis sur un film </p>
        <div class="liste-films">
            <div class="film_avis" v-for="avi in avisNonAcceptes" :key="avi.id_avis">
                <h2>Avis sur ({{ avi.titre }})</h2>
                <p>{{ avi.commentaire }}</p>
                <button class="btn_modif" @click="accepterAvis(avi.id_avis)">
                    Accepter <i class="fa-solid fa-circle-check"></i>
                </button>
                <button class="btn_supprimer" @click="supprimerAvis(avi.id_avis)">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    </div>
</template>





<script>
import EspaceEmployeData from '@/assets/js/EspaceEmploye.js';

export default {
    data() {
        return EspaceEmployeData.data();
    },
    computed: EspaceEmployeData.computed,
    methods: EspaceEmployeData.methods,
    mounted() {
        this.fetchfilms();
        this.fetchsalles();
        this.fetchavis();
    }
};
</script>

<style scoped>
@import '@/assets/styles/EspaceEmploye.css';
</style>