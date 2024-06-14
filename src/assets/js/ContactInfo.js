import emailjs from 'emailjs-com';
import { emailjsConfig } from '@/emailjs.config';
export default {
  data() {
    return {
      nom: '',
      titre: '',
      description: ''
    };
  },
  methods: {
    envoyer() {
      const templateParams = {
        from_name: this.nom,
        title: this.titre,
        message: this.description
      };

      emailjs.send(emailjsConfig.serviceID, emailjsConfig.templateID, templateParams, emailjsConfig.userID)
        .then(response => {
          console.log('Email sent successfully!', response.status, response.text);
          alert('Email envoyé avec succès !');
        })
        .catch(error => {
          console.error('Failed to send email:', error);
          alert('Échec de l\'envoi de l\'email.');
        });
    }
  }
};
