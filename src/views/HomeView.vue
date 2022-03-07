<template>
    <MovieList :movies ="movies" />
    <div v-if="totalItems > 0" class="mt-4">
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

   const movies = ref(MovieModule.GetMovies);
   const totalItems = computed(() => MovieModule.totalItems);
   const showPerPage = computed(() => MovieModule.showPerPage);
   const currentPage = computed(() => MovieModule.currentPage);

   const onPageChanged = async (data: PageData) => {
        console.log(data.pageNumber)
        movies.value = await MovieModule.getMoviesInPage(data);
   }
  
    onMounted( async () => {
        await MovieModule.addMovies(); 
    })

</script>
