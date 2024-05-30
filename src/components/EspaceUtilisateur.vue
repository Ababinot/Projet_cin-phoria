<template>
    <div class="espace-utilisateur">
      <h1>Mes réservations</h1>
      <p>Consulter vos réservations</p>
      <div class="reservations">
        <div class="reservation" v-for="reservation in reservations" :key="reservation.id">
          <div class="reservation-date">{{ formatDate(reservation.date) }}</div>
          <div class="reservation-details">
            <span>{{ reservation.personnes }} personnes</span>
            <span><strong>{{ reservation.prix_total }}€</strong></span>
            <span :class="{'confirmed': reservation.etat === 'confirmé', 'pending': reservation.etat === 'en attente', 'cancelled': reservation.etat === 'annulé'}">{{ reservation.etat }}</span>
          </div>
          <button v-if="isPastDate(reservation.date)" @click="noterReservation(reservation)">Noter</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  //import EspaceUtilisateurData from '@/assets/js/EspaceUtilisateur.js'; 
  export default {
    
  };
  </script>
  
  <style scoped>
  @import '@/assets/styles/EspaceUtilisateur.css';
  </style>
  