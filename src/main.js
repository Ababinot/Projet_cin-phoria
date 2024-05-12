import { createApp } from 'vue'; // Importez createApp depuis 'vue'
import { createRouter, createWebHistory } from 'vue-router'; // Importez createRouter et createWebHistory depuis 'vue-router'
import PageAccueil from './components/PageAccueil.vue';
import ListeFilms from './components/ListeFilms.vue';
import ContactInfo from './components/ContactInfo.vue';
import ReserverBillet from './components/ReserverBillet.vue';
import ConnexionUser from './components/ConnexionUser.vue';
import App from './App.vue'; // Importez le composant racine de votre application (App.vue)
import '@fortawesome/fontawesome-free/css/all.css';




const routes = [
  { path: '/', component: PageAccueil },
  { path: '/films', component: ListeFilms },
  { path: '/contact', component: ContactInfo },
  { path: '/reserver', component: ReserverBillet },
  { path: '/connexion', component: ConnexionUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App); // Créez votre application Vue en utilisant le composant racine (App.vue)
app.use(router); // Utilisez le router dans votre application Vue
app.mount('#app'); // Montez votre application Vue sur l'élément avec l'ID 'app'
