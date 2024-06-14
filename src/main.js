import { createApp } from 'vue'; // Importez createApp depuis 'vue'
import { createRouter, createWebHistory } from 'vue-router'; // Importez createRouter et createWebHistory depuis 'vue-router'
import PageAccueil from './components/PageAccueil.vue';
import ListeFilms from './components/ListeFilms.vue';
import ContactInfo from './components/ContactInfo.vue';
import ReserverBillet from './components/ReserverBillet.vue';
import ConnexionUser from './components/ConnexionUser.vue';
import InscriptionUser from './components/InscriptionUser.vue';
import EspaceUtilisateur from './components/EspaceUtilisateur.vue';
import EspaceEmploye from './components/EspaceEmploye.vue';
import EspaceAdministration from './components/EspaceAdministration.vue';

import App from './App.vue'; // Importez le composant racine de votre application (App.vue)
import '@fortawesome/fontawesome-free/css/all.css';




const routes = [
  { path: '/', component: PageAccueil, },
  { path: '/films', component: ListeFilms },
  { path: '/contact', component: ContactInfo },
  { path: '/reserver', component: ReserverBillet },
  {
    path: '/connexion',
    component: ConnexionUser,
    meta: { requiresAuth: false, requiresUnauth: true }
  },
  { path: '/inscription', component: InscriptionUser },
  {
    path: '/utilisateur',
    component: EspaceUtilisateur,
    meta: { requiresAuth: true, role: 'Client' } // Utilisateur
  },
  {
    path: '/employe',
    component: EspaceEmploye,
    meta: { requiresAuth: true, role: 'employe' } // Employé
  },
  {
    path: '/administration',
    component: EspaceAdministration,
    meta: { requiresAuth: true, role: 'administrateur' } // Administration
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/connexion');
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    next('/');
  } else if (to.meta.role) {
    const userRole = getUserRole(); // Fonction pour récupérer le rôle de l'utilisateur depuis le token JWT
    if (userRole !== to.meta.role) {
      // Redirigez l'utilisateur vers la page d'accueil ou une autre page s'il n'a pas le bon rôle
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

function getUserRole() {
  const jwtToken = localStorage.getItem('token');
  if (!jwtToken) {
    return null;
  }

  try {
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodedToken = JSON.parse(jsonPayload);

    return decodedToken.role;
  } catch (error) {
    console.error('Erreur lors du décodage du token JWT :', error);
    return null;
  }
}

const app = createApp(App);
app.use(router);
app.mount('#app');