import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      espace_administration_film: [],
      espace_administration_salle: [],
      espace_administration_avis: [],
      espace_administration_reservation_film: [],
    };
  },
  methods: {
    async fetchfilms() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-administration-film');
        const data = await response.json();
        this.espace_administration_film = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    },

    async fetchsalles() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-administration-salle');
        const data = await response.json();
        this.espace_administration_salle = data;


      } catch (error) {
        console.error('Erreur lors de la récupération des avis :', error);
      }
    },
    async fetchreservation_film() {
      try {
        const response = await fetch('http://localhost:3001/api/espace-administration-nbreservation');
        const data = await response.json();
        this.espace_administration_reservation_film = data;
    
        // Ajoutez le console.log ici pour vérifier les données
        console.log('Données de réservation des films:', this.espace_administration_reservation_film);
    
      } catch (error) {
        console.error('Erreur lors de la récupération des nbreservation_film :', error);
      }
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

        console.log('Token JWT décodé :', decodedToken);

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

    createChart() {
      const ctx = document.getElementById('reservationChart').getContext('2d');
      const films = this.espace_administration_reservation_film.map(film => film.nom_film);
      const reservations = this.espace_administration_reservation_film.map(film => film.nombre_reservations);

      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: films,
              datasets: [{
                  label: 'Nombre de réservations',
                  data: reservations,
                  backgroundColor: 'rgba(91,35,51)',
                  borderColor: 'rgba(86,77,74)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
  }

  },
  mounted() {
    this.fetchfilms();
    this.fetchsalles();
    this.fetchreservation_film().then(() => {
      this.createChart();
    });

  }
};
