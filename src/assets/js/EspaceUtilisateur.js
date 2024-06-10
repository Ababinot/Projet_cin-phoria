import moment from 'moment';

export default {
  data() {
    return {
      espace_utilisateur: [],
      utilisateurConnecteEmail: null,
      reservationSelectionnee: {}, // Initialisé comme un objet vide
      note: null,
      description: null
    };
  },
  methods: {
    async fetchReservations() {
      try {
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
          console.error('Token JWT introuvable dans localStorage');
          return;
        }

        const decodedToken = this.decodeJwt(jwtToken);

        if (!decodedToken || !decodedToken.email) {
          console.error('Impossible de décoder le token JWT ou l\'adresse e-mail est introuvable');
          return;
        }

        this.utilisateurConnecteEmail = decodedToken.email;

        const response = await fetch(`http://localhost:3001/api/espace-utilisateur?email_utilisateur=${encodeURIComponent(this.utilisateurConnecteEmail)}`);
        const data = await response.json();

        

        this.espace_utilisateur = data.filter(reservation => reservation.email_utilisateur === this.utilisateurConnecteEmail);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    },

    async ajoutAvis() {
      try {
        if (!this.note || !this.description) {
          alert('Veuillez remplir tous les champs pour ajouter un avis');
          return;
        }
        if (this.note > 5) {
          alert('La note ne peut pas dépasser 5.');
          return;
        }
    
        const avisData = {
          note: this.note,
          commentaire: this.description,
          id_film: this.reservationSelectionnee.id_film
        };
    
        const response = await fetch('http://localhost:3001/api/ajouter-avis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(avisData)
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erreur du serveur:', errorText);
          throw new Error('Erreur lors de l\'ajout de l\'avis');
        }
    
        alert('Avis ajouté avec succès');
        // Recharger la page après avoir ajouté avec succès l'avis
       this.fermerDialog();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'avis :', error.message);
        alert('Une erreur est survenue lors de l\'ajout de l\'avis');
      }
    },
    
    noterReservation(reservation) {
      // Vérifier si la réservation a déjà une note attribuée
      if (reservation.note) {
        alert('Cette réservation a déjà été notée.');
        return;
      }
    
      // Assigner la réservation sélectionnée explicitement
      this.reservationSelectionnee = { 
        id_film: reservation.id_film,
        id_reservation: reservation.id_reservation,
        date_reservation: reservation.date_reservation,
        nombre_personnes: reservation.nombre_personnes,
        prix_total: reservation.prix_total,
        statut: reservation.statut,
        email_utilisateur: reservation.email_utilisateur,
        nom_utilisateur: reservation.nom_utilisateur,
        prenom_utilisateur: reservation.prenom_utilisateur,
        id_utilisateur: reservation.id_utilisateur
      };
    
      this.afficherDialog();
    },
    

    formatDate(dateString) {
      moment.locale('fr');
      return moment(dateString).format('LL');
    },
    isPastDate(dateString) {
      return moment(dateString).isBefore(moment());
    },

    decodeJwt(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT :', error);
        return null;
      }
    },

    afficherDialog() {
      this.$refs.dialog.showModal();
    },
    fermerDialog() {
      this.$refs.dialog.close();
    }
  },
  mounted() {
    this.fetchReservations();
  }
};
