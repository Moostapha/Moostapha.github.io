<template>
  
  <nav id="navbar" class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <h3>Groupomania </h3>
    
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        
        <li class="nav-item">
          <router-link to="/groupomania/login"><i class="fas fa-sign-in-alt"></i>Login</router-link> 
        </li>
        <li class="nav-item">
          <router-link to="/groupomania/signup"><i class="fas fa-user-edit"></i>Signup</router-link> 
        </li>
        <li class="nav-item">
          <router-link to="/groupomania/publications"><i class="fas fa-comments"></i> Publications</router-link> 
        </li>
        <li class="nav-item">
          <router-link to="/groupomania/profil/:userId"><i class="fas fa-user-circle"></i>Profil</router-link>
        </li>
        
        <!-- lien de déconnexion du compte-->
        <li class="nav-item">
          <a href="javascript:void(0)" @click="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>



  <!-- <router-link class="router-link" :to="{ name : 'OnePublication', params: { id: publication.publicationId }}">
    <div class="titre px-5 py-3">{{publication.publicationTitre}}</div>
    <div class="description px-5 py-3">{{publication.publicationDescription}}</div>
  </router-link> -->
</template>


<script>

export default {
  name:'Nav',
  
  methods: {
    // fonction de suppression de session user (items du localStorage)
    logout() {
      // remove user session
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      console.log('Deconnexion réussie');
      
      // redirection vers accueil/login
      this.$router.push('/groupomania/login');
    }
  }
}
</script>


<style lang="sass" scoped>
#navbar 
  // padding: 20px //30px
  font-size: x-large
  background-color: white //#42b7b945
  justify-items: center
  #navbarNavDropdown
    justify-content: center
  h3
    font-weight: bold
    color: royalblue
    margin: 0vh
    padding: 0.5rem
    padding-bottom: 0.55rem
  ul
    display: flex
    justify-content: center
    @media screen and (max-width: 991px) 
      flex-direction: column
      background-color: #d5e4f4
  li 
    padding: 0.5rem
    display: flex
    margin: 0vh
    @media screen and (max-width: 991px) 
      padding: 0rem
      &:hover
        background-color: #42b7b985
  a 
    font-weight: bold
    color: #2c3e50
    padding: 0.5rem
    margin: 10px
    text-decoration: none
    border-radius: 20px
    cursor: pointer
    transition: 1000ms
    &:hover
      background-color: #42b7b985
    &.router-link-exact-active 
      color: #007bff
    @media screen and (max-width: 991px) 
      margin: 1px
      &:hover
        background-color: transparent
</style>