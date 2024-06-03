<template>
  <div class="espace-utilisateur">
    <h1>Mes réservations</h1>
    <p>Consulter vos réservations</p>
    <div class="reservations">
      <div class="reservation" v-for="reservation in espace_utilisateur" :key="reservation.id_reservation">
        <div class="reservation-date">{{ formatDate(reservation.date_reservation) }}</div>
        <div class="reservation-details">
          <span>{{ reservation.nombre_personnes }} personnes</span>
          <span><strong>{{ reservation.prix_total }}€</strong></span>
          <span
            :class="{ 'confirmed': reservation.statut === 'Confirmée', 'pending': reservation.statut === 'En attente', 'cancelled': reservation.statut === 'Annulée' }">{{
              reservation.statut }}</span>
        </div>
        <button class="button" v-if="isPastDate(reservation.date_reservation)" @click="afficherDialog(reservation)">Noter</button>
      </div>
    </div>
    <!-- Dialog box -->
    <dialog ref="dialog" class="dialog">
      <h2>Noter la réservation</h2>
      <label for="note">Note (sur 5)</label>
      <input type="number" id="note" name="note" min="0" max="5">
      <label for="description">Description</label>
      <textarea id="description" name="description" ></textarea>
      <button @click="fermerDialog" class="button" >Fermer</button>
      <button class="button" >Comfirmer</button>
    </dialog>

  </div>
</template>





<script>
import EspaceUtilisateurData from '@/assets/js/EspaceUtilisateur.js';

export default {
  data() {
    return EspaceUtilisateurData.data(); // Utilisation des données exportées
  },
  computed: EspaceUtilisateurData.computed, // Utilisation des calculs exportés
  methods: EspaceUtilisateurData.methods, // Utilisation des méthodes exportées
  mounted() {
    this.fetchReservations(); // Appel de la méthode pour récupérer les réservations lors du montage du composant
  }
};
</script>

<style scoped>
@import '@/assets/styles/EspaceUtilisateur.css';
</style>