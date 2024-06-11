<template>
    <div class="espace-employe">
        <h1>Intranet Films/séances</h1>
        <p>Créer/modifier/supprimer les films ainsi que les séances </p>
        <button class="btn_ajout" @click="afficherDialogAjoutFilm">Ajouter un film</button>
        <button class="btn_ajout" @click="afficherDialogAjoutSeance">Ajouter une séance</button>
        <div class="liste-films">
            <div class="film" v-for="film in espace_employe_film" :key="film.titre">
                <h2>{{ film.titre }}</h2>
                <button class="btn_modif" @click="afficherDialogModificationFilm(film.titre)">
                    Modifier <i class="fa fa-pencil"></i>
                </button>
                <button class="btn_supprimer" @click="supprimerFilm(film.titre)">
                    Supprimer <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
        <dialog ref="dialogAjoutFilm" class="dialog_film">
            <label for="titre">Titre :</label>
            <input type="text" id="titre" v-model="nouveauFilm.titre">
            <label for="description">Description :</label>
            <textarea id="description" v-model="nouveauFilm.description"></textarea>
            <label for="image">Image (lien imgbb) :</label>
            <input type="text" id="image" v-model="nouveauFilm.image">
            <label for="genre">Genre :</label>
            <input type="text" id="genre" v-model="nouveauFilm.genre">
            <label for="age">Âge minimum :</label>
            <input type="number" id="age" v-model="nouveauFilm.age_minimum">
            <div class="btn_ajt_film">
                <button class="primary-button" @click="ajouterFilm">Ajouter le film</button>
                <button class="secondary-button" @click="fermerDialogAjoutFilm">Fermer</button>
            </div>
        </dialog>
        <dialog ref="dialogAjoutSeance" class="dialog_film">
            <label for="date_debut">Date/heure de début :</label>
            <input type="datetime-local" id="date_debut" v-model="nouvelleSeance.date_debut">

            <label for="date_fin">Date/heure de fin :</label>
            <input type="datetime-local" id="date_fin" v-model="nouvelleSeance.date_fin">

            <label for="id_film_seance">Film :</label>
            <select id="id_film_seance" v-model="nouvelleSeance.id_film_seance">
                <option v-for="film in espace_employe_film" :key="film.id_film" :value="film.id_film">{{ film.titre }}
                </option>
            </select>

            <label for="id_salle">Salle :</label>
            <select id="id_salle" v-model="nouvelleSeance.id_salle">
                <option v-for="salle in espace_employe_salle" :key="salle.id_salle" :value="salle.id_salle">{{
                    salle.num_salle }}</option>
            </select>

            <div class="btn_ajt_film">
                <button class="primary-button" @click="ajouterSeance">Ajouter la séance</button>
                <button class="secondary-button" @click="fermerDialogAjoutSeance">Fermer</button>
            </div>
        </dialog>
        <dialog ref="dialogModificationFilm" class="dialog_film">
            <input type="hidden" name="id_film" v-model="filmModif.id_film">

            <label for="titre_modif">Titre :</label>
            <input type="text" id="titre_modif" v-model="filmModif.titre">
            <label for="description_modif">Description :</label>
            <textarea id="description_modif" v-model="filmModif.description"></textarea>
            <label for="image_modif">Image (lien imgbb) :</label>
            <input type="text" id="image_modif" v-model="filmModif.image">
            <label for="genre_modif">Genre :</label>
            <input type="text" id="genre_modif" v-model="filmModif.genre">
            <label for="age_modif">Âge minimum :</label>
            <input type="number" id="age_modif" v-model="filmModif.age_minimum">
            <div class="btn_ajt_film">
                <button class="primary-button" @click="modifierFilm">Modifier le film</button>
                <button class="secondary-button" @click="fermerDialogModificationFilm">Fermer</button>
            </div>
        </dialog>

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