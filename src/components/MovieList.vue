<template>
    <div v-if="movies" className="d-flex flex-row flex-wrap centered">
       <Movie  class='movie'  v-for="movie in movies" 
              :key="movie.imdbID"
              :movie ="movie"
               />
    </div>
     <p v-else> Loading...</p>
</template>

<script setup lang="ts">

import MovieModule from '@/store/MovieModule'
import {computed, onMounted } from 'vue'
import Movie from './Movie.vue'


   const movies = computed(() => MovieModule.GetMovies);
  
    onMounted( async () => {
        await MovieModule.AddMovies(); 
    })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.movie
    width : 220px
    margin: .4rem
    margin-bottom: $margin
    padding: $padding
    

</style>
