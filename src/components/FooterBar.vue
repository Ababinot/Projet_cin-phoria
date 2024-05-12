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
                    <router-link class="link" to="/">Accueil</router-link>
                    <router-link class="link" to="/films">Films</router-link>
                    <router-link class="link" to="/reserver">Réserver</router-link>
                    <router-link class="link" to="/contact">Contact</router-link>
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
/* Styles pour le footer */
.Footer {
    background-color: var(--couleur-tertiaire);
    /* Couleur de fond du footer */
    color: white;
    /* Couleur du texte */
    padding: 20px;
    /* Espacement intérieur */
    display: flex;
    justify-content: space-between;
    /* Pour aligner les éléments horizontalement */
}

.left,
.middle,
.right {
    flex: 1;
    /* Les sections prennent le même espace */
}

.horaires,
.copyright,
.contact-info {
    margin-bottom: 20px;
    /* Espacement entre les sections */
}

.link{
    color: white;
    /* Couleur des liens */
   
}

.nav-menu{
    background-color: var(--couleur-tertiaire);
}

.nav-menu ul {
    list-style: none;
    /* Supprime les puces de la liste */
    padding: 0;
    /* Supprime le padding par défaut de la liste */
}

.nav-menu ul li {
    display: inline-block;
    /* Aligne les éléments horizontalement */
    margin-right: 20px;
    /* Espacement entre les éléments */
}

.nav-menu ul li:last-child {
    margin-right: 0;
    /* Pas de marge à droite pour le dernier élément */
}

.nav-menu ul li a {
    color: white;
    /* Couleur du texte des liens */
    text-decoration: none;
    /* Supprime le soulignement des liens */
}

.nav-menu ul li a:hover {
    text-decoration: underline;
    /* Ajoute un soulignement au survol */
}
</style>