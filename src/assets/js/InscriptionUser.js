export default {
  data() {
    return {
      email: '',
      nom: '',
      prenom: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
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

      fetch('http://localhost:3001/api/inscription', {
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
              throw new Error(json.error || 'Erreur lors de l\'inscription');
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
        console.error('Erreur lors de l\'inscription:', error);
        alert('Une erreur est survenue lors de l\'inscription: ' + error);
      });
    }
  }
};
