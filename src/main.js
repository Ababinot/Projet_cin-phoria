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
    meta: { requiresAuth: true } // Ajoutez cette méta-information pour indiquer que cette route nécessite une authentification
  },
  {
    path: '/employe',
    component: EspaceEmploye,
    meta: { requiresAuth: true } // Ajoutez cette méta-information pour indiquer que cette route nécessite une authentification
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
  } else {
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');