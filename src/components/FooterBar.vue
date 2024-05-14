<template>
    <footer class="Footer">
        <div class="left">
            <!-- Horaires du lundi au dimanche -->
            <div class="horaires">
                <h3>Horaires</h3>
                <ul>
                    <li>Lundi - Vendredi : 10h00 - 22h00</li>
                    <li>Samedi - Dimanche : 12h00 - 00h00</li>
                </ul>
            </div>
            <!-- Copyright -->
            <div class="copyright">
                <p>© 2024 Cinéphoria. Tous droits réservés.</p>
            </div>
        </div>
        <div class="middle">
            <!-- Menu de navigation -->
            <nav class="nav-menu">
                <div class="links">
                    <router-link class="linkF" to="/">Accueil</router-link>
                    <router-link class="linkF" to="/films">Films</router-link>
                    <router-link class="linkF" to="/reserver">Réserver</router-link>
                    <router-link class="linkF" to="/contact">Contact</router-link>
                </div>
            </nav>
        </div>
        <div class="right">
            <!-- Adresse du cinéma et numéro de téléphone -->
            <div class="contact-info">
                <p>Cinéphoria</p>
                <p>123 Rue du Cinéma</p>
                <p>75000 Ville du Cinéma</p>
                <p>Tél : 01 23 45 67 89</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {

};
</script>

<style scoped>
@import '@/assets/styles/FooterBar.css';
</style>;