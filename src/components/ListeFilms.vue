<template>
  <div class="liste-films">
    <div class="spacer1"></div>
    <h1>Films</h1>
    <div class="input-row">
      <!-- Choix du cinéma -->
      <div class="input-group">
        <label for="cinema">Cinéma</label>
        <select id="cinema" v-model="selectedCinema">
          <option value="">Tous les cinémas</option>
          <option v-for="cinema in cinemas" :key="cinema" :value="cinema">{{ cinema }}</option>
        </select>
      </div>

      <div class="spacer"></div>

      <!-- Choix du genre -->
      <div class="input-group">
        <label for="genre">Genre</label>
        <select id="genre" v-model="selectedGenre">
          <option value="">Tous les genres</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <div class="spacer"></div>

      <!-- Choix du jour -->
      <div class="input-group">
        <label for="jour">Jour</label>
        <select id="jour" v-model="selectedDate">
          <option value="">Tous les jours</option>
          <option v-for="date in dates" :key="date" :value="date">{{ formatDate(date) }}</option>
        </select>
      </div>
    </div>
    <button class="filtre" @click="filtre">Filtrer</button>
  </div>

  <div class="film-cards">
  <div v-for="(film, index) in filteredFilms" :key="index" class="custom-card" @click="openPopup(index)">
    <div class="image-container">
      <div v-if="film.age_minimum" class="min-age">-{{ film.age_minimum }}</div>
      <img :src="film.image" alt="film" />
      <div v-if="film.coup_de_coeur" class="heart-icon">
        <i class="fas fa-heart"></i>
      </div>
    </div>
    <div class="content">
      <div class="line">
        <div class="title">{{ film.titre }}</div>
      </div>
      <div class="line">
        <div class="description">{{ formatDescription(film.description) }}</div>
      </div>
      <div class="line">
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star">{{ n <= film.note_moyenne ? '★' : '☆' }}</span>
        </div>
      </div>
    </div>
  </div>
</div>



<dialog ref="popup" class="film-popup">
    <div class="popup-content">
      <div class="popup-left">
        <div v-if="selectedFilm && selectedFilm.age_minimum" class="min-age">-{{ selectedFilm.age_minimum }}</div>
        <img v-if="selectedFilm" :src="selectedFilm.image" alt="Popup Image" class="img_pop_film" />
        <div v-if="selectedFilm && selectedFilm.coup_de_coeur" class="heart-icon_pop_up">
          <i class="fas fa-heart"></i>
        </div>
      </div>
      <div class="popup-right">
        <button class="close-button" @click="closePopup">&times;</button>
        <div class="film-details" v-if="selectedFilm">
          <h2>{{ selectedFilm.titre }}</h2>
          <p>{{ selectedFilm.description }}</p>
          <div class="popup-rating">
            <span v-for="n in 5" :key="n" class="star">{{ n <= selectedFilm.note_moyenne ? '★' : '☆' }}</span>
          </div>
        </div>

        <div class="showtimes" v-if="filteredSeances.length > 0">
          <div class="showtime" v-for="(seance, index) in filteredSeances" :key="index">
            <div>{{ seance.type_projection }}</div>
            <button @click="reserver">Réserver</button>
            <div>{{ seance.heure_debut }} - {{ seance.heure_fin }}</div>
            <div>{{ formatDate(seance.date) }}</div>
          </div>
        </div>
        <div v-else>
          <p>Aucune séance disponible pour ce film.</p>
        </div>
      </div>
    </div>
  </dialog>

</template>

<script>
import ListeFilmsData from '@/assets/js/ListeFilms.js'; // Importation des données exportées depuis ListeFilms.js

export default {
  props: ListeFilmsData.props, // Utilisation des props exportées
  name: 'ListeFilms',
  data() {
    return ListeFilmsData.data(); // Utilisation des données exportées
  },
  computed: ListeFilmsData.computed, // Utilisation des computed exportées
  methods: ListeFilmsData.methods,  // Utilisation des méthodes exportées
  mounted() {
    this.fetchFilms(); // Appel de la méthode pour récupérer les films lors du montage du composant
    this.fetchSeances(); // Appel de la méthode pour récupérer les séances lors du montage du composant
    this.fetchSeances_cinema_film_filtre(); // Appel de la méthode pour récupérer les séances filtrées lors du montage du composant
  }
};
</script>

<style scoped>
@import '@/assets/styles/ListeFilms.css';
</style>
