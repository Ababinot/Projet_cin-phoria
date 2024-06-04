import moment from 'moment';

export default {
  data() {
    return {
      espace_utilisateur: [],
      utilisateurConnecteEmail: null // Ajout de la variable pour stocker l'adresse e-mail de l'utilisateur connecté
    };
  },
  methods: {
    async fetchReservations() {
      try {
        // Récupérer le token JWT depuis localStorage
        const jwtToken = localStorage.getItem('token');
    
        if (!jwtToken) {
          console.error('Token JWT introuvable dans localStorage');
          return; // Arrêter l'exécution si le token JWT est introuvable
        }
    
        // Décoder le token pour obtenir l'adresse e-mail de l'utilisateur connecté
        const decodedToken = this.decodeJwt(jwtToken);
    
        if (!decodedToken || !decodedToken.email) {
          console.error('Impossible de décoder le token JWT ou l\'adresse e-mail est introuvable');
          return; // Arrêter l'exécution si le token JWT ne peut pas être décodé ou l'adresse e-mail est introuvable
        }
    
        // Récupérer l'adresse e-mail de l'utilisateur connecté
        this.utilisateurConnecteEmail = decodedToken.email;
    
        // Récupérer les réservations de l'utilisateur connecté en utilisant son adresse e-mail
        const response = await fetch(`http://localhost:3001/api/espace-utilisateur?email_utilisateur=${encodeURIComponent(this.utilisateurConnecteEmail)}`);
        const data = await response.json();
    
        // Filtrer les réservations pour inclure uniquement celles de l'utilisateur connecté
        this.espace_utilisateur = data.filter(reservation => reservation.email_utilisateur === this.utilisateurConnecteEmail);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
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
      alert(`Noter la réservation pour le ${this.formatDate(reservation.date_reservation)}`);
    },
    decodeJwt(token) {
      // Fonction pour décoder le token JWT
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);

        

        return decodedToken;
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
      }
    },

    afficherDialog() {
      // Ouvrir la boîte de dialogue
      this.$refs.dialog.showModal();
    },
    fermerDialog() {
      // Fermer la boîte de dialogue
      this.$refs.dialog.close();
    },

  },
  mounted() {
    this.fetchReservations();
  }
};
