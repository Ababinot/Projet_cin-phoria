import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      espace_administration_film: [],
      espace_administration_salle: [],
      espace_administration_avis: [],
      espace_administration_reservation_film: [],
      email: '',
      nom: '',
      prenom: '',
      password: '',
      confirmPassword: '',
      updateEmail: '',
      updatePassword: '',
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
    },

    validatePassword(password) {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      return regex.test(password);
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    inscription() {
      console.log('Données d\'inscription envoyées :', {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        confirmPassword: this.confirmPassword
      });

      if (!this.email || !this.nom || !this.prenom || !this.password || !this.confirmPassword) {
        alert('Tous les champs doivent être remplis');
        return;
      }

      if (!this.validateEmail(this.email)) {
        alert('Adresse email invalide');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }

      if (!this.validatePassword(this.password)) {
        alert('Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.');
        return;
      }

      const userData = {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        verif_password: this.confirmPassword
      };

      console.log('Données envoyées au serveur :', userData);

      fetch('http://localhost:3001/api/inscriptionEmploye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            try {
              const json = JSON.parse(text);
              throw new Error(json.error || 'Erreur lors de l\'inscriptionEmploye');
            } catch {
              throw new Error(text);
            }
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse du serveur:', data);
        alert('Inscription réussie');
        // Rafraîchir la page après l'inscription réussie
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur lors de l\'inscriptionEmploye:', error);
        alert('Une erreur est survenue lors de l\'inscriptionEmploye: ' + error);
      });
    },

    modifier() {
      if (!this.updateEmail || !this.updatePassword) {
        alert('Tous les champs doivent être remplis');
        return;
      }

      if (!this.validateEmail(this.updateEmail)) {
        alert('Adresse email invalide');
        return;
      }

      if (!this.validatePassword(this.updatePassword)) {
        alert('Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial, et être d\'au moins 6 caractères.');
        return;
      }

      const updateData = {
        email: this.updateEmail,
        password: this.updatePassword
      };

      console.log('Données de mise à jour envoyées au serveur :', updateData);

      fetch('http://localhost:3001/api/updateEmploye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            try {
              const json = JSON.parse(text);
              throw new Error(json.error || 'Erreur lors de la mise à jour');
            } catch {
              throw new Error(text);
            }
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse du serveur:', data);
        alert('Mise à jour réussie');
        // Rafraîchir la page après la mise à jour réussie
        window.location.reload();
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour :', error);
        alert('Une erreur est survenue lors de la mise à jour : ' + error);
      });
    },

    handleError(message, error) {
      console.error(message, error);
      alert('Une erreur est survenue : ' + message);
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
