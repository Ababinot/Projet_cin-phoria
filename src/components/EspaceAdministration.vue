<template>
  <div class="espace-employe">
    <h1>Intranet Films/séances</h1>
    <p>Créer/modifier/supprimer les films ainsi que les séances </p>
    <button class="btn_ajout" @click="afficherDialogAjoutFilm">Ajouter un film</button>
    <button class="btn_ajout" @click="afficherDialogAjoutSeance">Ajouter une séance</button>
    <div class="liste-films">
      <div class="film" v-for="film in espace_administration_film" :key="film.titre">
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
      <div>
        <h5>Séances</h5>
        <ul>
          <li v-for="seance in filmModif.seances" :key="seance.id_seance">
            <p>Date de début: {{ seance.date_debut }}</p>
            <p>Date de fin: {{ seance.date_fin }}</p>
            <!-- Ajoutez ici d'autres informations sur la séance si nécessaire -->
          </li>
        </ul>
      </div>
    </dialog>
    <h1>Intranet Salles</h1>
    <p>Modifier/supprimer et concevoir les salles qui seront utilisées pour les séances </p>
    <button class="btn_ajout" @click="afficherDialogAjoutSalle">Ajouter une salle</button>
    <div class="liste-films">
      <div class="film" v-for="salle in espace_administration_salle" :key="salle.num_salle">
        <h2>Salle n°{{ salle.num_salle }}</h2>
        <button class="btn_modif" @click="afficherDialogModifSalle(salle.id_salle)">
          Modifier <i class="fa fa-pencil"></i>
        </button>
        <button class="btn_supprimer" @click="supprimerSalle(salle.id_salle)">
          Supprimer <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
    <dialog ref="dialogAjoutSalle" class="dialog_film">
      <label for="num_salle">Numéro de salle :</label>
      <input type="number" id="num_salle" v-model="nouvelleSalle.num_salle">

      <label for="capacite">Capacité :</label>
      <input type="number" id="capacite" v-model="nouvelleSalle.capacite">

      <label for="type_projection">Type de projection :</label>
      <input type="text" id="type_projection" v-model="nouvelleSalle.type_projection">

      <label for="id_cinema">Cinéma :</label>
      <select id="id_cinema" v-model="nouvelleSalle.id_cinema">
        <option v-for="cinema in cinemas" :key="cinema.id_cinema" :value="cinema.id_cinema">
          {{ cinema.nom_cinema }}
        </option>
      </select>

      <div class="btn_ajt_salle">
        <button class="primary-button" @click="ajouterSalle">Ajouter la salle</button>
        <button class="secondary-button" @click="fermerDialogAjoutSalle">Fermer</button>
      </div>
    </dialog>
    <dialog ref="dialogModifSalle" class="dialog_film">
            <input type="hidden" name="id_salle" v-model="salleModif.id_salle">

            <label for="num_salle_modif">Numéro de salle :</label>
            <input type="number" id="num_salle_modif" v-model="salleModif.num_salle">

            <label for="capacite_modif">Capacité :</label>
            <input type="number" id="capacite_modif" v-model="salleModif.capacite">

            <label for="type_projection_modif">Type de projection :</label>
            <input type="text" id="type_projection_modif" v-model="salleModif.type_projection">

            <label for="id_cinema_modif">Cinéma :</label>
            <select id="id_cinema_modif" v-model="salleModif.id_cinema">
                <option v-for="cinema in cinemas" :key="cinema.id_cinema" :value="cinema.id_cinema">
                    {{ cinema.nom_cinema }}
                </option>
            </select>

            <div class="btn_modif_salle">
                <button class="primary-button" @click="modifierSalle">Modifier la salle</button>
                <button class="secondary-button" @click="fermerDialogModifSalle">Fermer</button>
            </div>
        </dialog>
    <h1>Administration Employé</h1>
    <p>Concevoir un compte «employé» en fournissant un login et mot de passe </p>
    <div class="creation_employe">
      <div class="icon">
        <i class="fa-regular fa-user"></i>
      </div>
      <h3>Compte employé</h3>
      <div class="input-group">
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>
      <div class="input-group">
        <input type="text" v-model="nom" placeholder="Nom" required />
      </div>
      <div class="input-group">
        <input type="text" v-model="prenom" placeholder="Prénom" required />
      </div>
      <div class="input-group">
        <input type="password" v-model="password" placeholder="Mot de passe" required />
      </div>
      <div class="input-group">
        <input type="password" v-model="confirmPassword" placeholder="Confirmation mot de passe" required />
      </div>
      <button class="buttonCo" @click="inscription">Créer</button>
    </div>
    <div class="update_employe">
      <h3>Mise à jour du compte employé</h3>
      <div class="input-group">
        <input type="email" v-model="updateEmail" placeholder="E-mail" required />
      </div>
      <div class="input-group">
        <input type="password" v-model="updatePassword" placeholder="Nouveau mot de passe" required />
      </div>
      <button class="buttonCo" @click="modifier">Modifier</button>
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
    this.fetchCinemas()
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