
import moment from 'moment';

export default {
  data() {
    return {
      reservations: []
    };
  },
  computed: {
    // Vous pouvez ajouter des computed properties si nécessaire
  },
  methods: {
    fetchReservations() {
      // Remplacez ceci par votre logique pour récupérer les réservations de l'utilisateur
      this.reservations = [
        {
          id: 1,
          date: '2024-05-20',
          personnes: 2,
          prix_total: 30,
          etat: 'confirmé'
        },
        {
          id: 2,
          date: '2024-06-10',
          personnes: 4,
          prix_total: 60,
          etat: 'en attente'
        },
        {
          id: 3,
          date: '2024-04-15',
          personnes: 3,
          prix_total: 45,
          etat: 'annulé'
        }
      ];
    },
    formatDate(dateString) {
      moment.locale('fr');
      return moment(dateString).format('LL');
    },
    isPastDate(dateString) {
      return moment(dateString).isBefore(moment());
    },
    noterReservation(reservation) {
      // Logique pour noter la réservation
      alert(`Noter la réservation pour le ${this.formatDate(reservation.date)}`);
    }
  },
  mounted() {
    this.fetchReservations();
  }
};

