export default {
  data() {
    return {
      email: '',
      nom: '',
      prenom: '',
      password: '',
      confirmPassword: '' // Ajoutez une variable pour la confirmation du mot de passe
    };
  },
  methods: {
    inscription() {
      console.log('Données d\'inscription envoyées :', {
        email: this.email,
        nom: this.nom,
        prenom: this.prenom,
        password: this.password,
        // Ajoutez d'autres champs si nécessaire
      });
      // Vérifiez si les mots de passe correspondent
      if (this.password !== this.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
      
      // Créez un objet contenant les données d'inscription
      const userData = {
        email_utilisateur: this.email,
        nom_utilisateur: this.nom,
        prenom_utilisateur: this.prenom,
        mdp_utilisateur: this.password
      };

      // Envoyez les données d'inscription au backend via une requête HTTP POST
      fetch('http://localhost:3001/api/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'inscription');
        }
        return response.json();
      })
      .then(data => {
        // Traitez la réponse du serveur si nécessaire
        console.log(data);
      })
      .catch(error => {
        console.error('Erreur:', error);
        // Affichez un message d'erreur à l'utilisateur si nécessaire
        alert('Une erreur est survenue lors de l\'inscription');
      });
    }
  }
};
