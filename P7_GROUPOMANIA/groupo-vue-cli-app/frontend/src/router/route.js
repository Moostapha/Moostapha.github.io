import Vue from 'vue'
import VueRouter from 'vue-router'
import AccueilConnexion from '../views/AccueilConnexion' // Import view pour page d'accueil connexion (component Login)
import Inscription from '../views/Inscription.vue' //  Import view pour page signup (component Signup)
import Actualite from '../views/Actualite.vue' // Import view pour page publications (component Posts)
import Profil from '../views/Profil'           // Import view pour page profil (component UserAccount)

Vue.use(VueRouter)

/* ROUTES DE L'APPLICATION
Tableau contenant des objets définissant chaque route
*/

const routes = [

  // URL PAGE D'ACCUEIL navbar:Login
  // component: Login => views: AccueilConnexion
  {
    path: '/groupomania/login',
    name: 'Connexion',
    component: AccueilConnexion // component venant de views importé en haut
  },
  
  // URL PAGE D'INSCRIPTION navbar:signup
  // component: Signup => views: Inscription
  {
    path: '/groupomania/signup',
    name: 'Inscription',
    component: Inscription
  },


  // URL PAGE FIL D'ACTUALITE navbar : publications
  // component: Posts => views: Actualite
  {
    path: '/groupomania/publications',       // URL correspondant au composant
    name: 'Fil d\'actualité',    // Nom de cette route pas obligatoire | champ non obligatoire
    component: Actualite,  // Composant affiché lorsque le path est trouvé
  },

    // URL PAGE profil
  // component: UserAccount=> views: profil
  {
    path: '/groupomania/profil/:userId',       // URL correspondant au composant
    name: 'Profil',    // Nom de cette route pas obligatoire | champ non obligatoire
    component: Profil,  // Composant affiché lorsque le path est trouvé
  },
]


//mode:'history' => pour enlever le # de l'URL
const router = new VueRouter({
  routes,
  mode:'history'
})

// export du router vers router-link => component Nav
export default router






