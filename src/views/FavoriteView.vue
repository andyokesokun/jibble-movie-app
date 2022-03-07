<template>
     <div v-if='movies.length == 0'>
        No favourites
     </div>
      <MovieList :movies ="movies" />
  
      <div v-if="totalItems > showPerPage" class="mt-4">
        <Pagination @pageChanged ="onPageChanged" :currentPage="currentPage" :totalItems="totalItems" 
                    :itemsPerPage ="showPerPage" :maxVisible ="10"
                      />
 
    </div>
</template>

<script setup lang="ts">
import MovieModule from '@/store/MovieModule'
import MovieList from '@/components/MovieList.vue';
import Pagination from '@/components/Pagination.vue'; 
import { PropType, ref } from '@vue/runtime-core'
import {computed,onMounted} from 'vue'  
import {PageData} from '@/models/PaginationModel'

   const movies = computed(() => MovieModule.favouriteMoveList);
   const totalItems = computed(() =>  MovieModule.favouriteMoveList.length);
   const showPerPage = computed(() => MovieModule.showPerPage);
   const currentPage = computed(() => MovieModule.currentPage);

   const onPageChanged = (data: PageData) => {
        (data.pageNumber)
   }
  
    onMounted( async () => {
        await MovieModule.AddMovies(); 
    })

</script>
