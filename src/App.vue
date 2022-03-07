<template>
  <div className="App">
    <header class="App-header">
      <p class="display-6 w-fit float-left">Movie Hub</p>
      <nav class="fit-content fit float-left mt-3 ms-3">
        <router-link class="menu-link" to="/"><MenuIcon class="icon"/> Home</router-link> 
        <router-link class="menu-link" to="/favourites"><CardsHeartIcon class="icon" /> Favorite</router-link>
      </nav>

      <div class="float-right mt-2 me-3">
          <MagnifyIcon class="icon me-1"  />
          <input
            class="fit-content"
            @keyup="onSearch"
            type="text"
            placeholder="Movie title"
          />
      </div>

    </header>


    <section class="container w-80  m-auto">
      <router-view />
    </section>
  </div>
</template>
<script setup lang="ts">
    import MenuIcon from 'vue-material-design-icons/Menu.vue';
    import CardsHeartIcon from 'vue-material-design-icons/CardsHeart.vue';
    import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
    import MovieModule from './store/MovieModule';
import { onMounted } from '@vue/runtime-core';

   const onSearch = (event: Event) =>{
        const value = (event.target as HTMLInputElement).value
         MovieModule.searchMovies(value)
    }


</script>


<style lang="sass">
 p
   margin-bottom: 0

 
.App-header 
    background-color:$app-bar-bg-color
    overflow: hidden
    color: white
    padding:
       top: 5px
       left: 20px
       right: 20px
       bottom: 5px

    margin-bottom: 5rem

.App-link 
     color: $app-link-color

a.menu-link
        text-decoration: none
        color: $menu-link-color
        margin: $link-margin

a.menu-link
  .icon
    width: .1rem
    color: $app-link-color

a.menu-link:hover
      color: $app-link-hover-color

.activeNav
   background: black
   border-radius: 20%

.activeNav
     a
      color: white

.nav-link 
    color: $link-color

.nav-link:focus
      color: white

.nav-link:hover
       color:  #525252

.lead 
    font-size: .8rem
    font-weight: 300
</style>
