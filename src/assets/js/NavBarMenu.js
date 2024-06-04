
export default {
  name: 'NavBarMenu',
  data() {
    return {
      userRole: '' // Ajout de la variable pour stocker le rôle de l'utilisateur
    };
  },
  methods: {
    handleClick() {
      this.$router.push('/connexion');
    },
    reserver() {
      this.$router.push('/reserver');
    },
    goToAccount() {
      this.$router.push('/utilisateur');
    },
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    },
    goToIntranet() {
      this.$router.push('/employe');
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

    async fetchUserRole() {
      try {
        // Récupérer le token JWT depuis localStorage
        
        const jwtToken = localStorage.getItem('token');
    
        if (!jwtToken) {
          console.error('Token JWT introuvable dans localStorage');
          return; // Arrêter l'exécution si le token JWT est introuvable
        }
    
        // Décoder le token pour obtenir les informations sur l'utilisateur
        const decodedToken = this.decodeJwt(jwtToken);
    
        if (!decodedToken || !decodedToken.role) {
          console.error('Impossible de décoder le token JWT ou le rôle est introuvable');
          return; // Arrêter l'exécution si le token JWT ne peut pas être décodé ou le rôle est introuvable
        }
    
        // Récupérer le rôle de l'utilisateur connecté
        const userRole = decodedToken.role;
        this.userRole = decodedToken.role;
        console.log('Rôle de l\'utilisateur connecté :', userRole);
    
        // Faites ce que vous avez besoin avec le rôle, comme afficher le bon bouton dans l'interface utilisateur, etc.
    
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
      }
    }
    
  },
  
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  mounted() {
    // Récupérer le rôle de l'utilisateur lors du montage du composant
    this.fetchUserRole();
  },
};