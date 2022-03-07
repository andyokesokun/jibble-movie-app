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

import Movie from './Movie.vue'
import { PropType, ref } from '@vue/runtime-core'
import MovieModel  from '@/models/MovieModel';

   const {movies} = defineProps({
      movies: Object as PropType<Array<MovieModel> >
   });
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.movie
    width : 220px
    margin: .4rem
    margin-bottom: $margin
    padding: $padding
    

</style>
