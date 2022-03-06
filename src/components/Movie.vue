<template>
    <div class="card" >
        <div class="card-body">
            <h5 class="card-title pb-2">{{title}}</h5>
            <p class="card-text mb-4">
                Year: {{movie.Year}}
            </p>
           <a :href="imdbIDUrl(movie.imdbID)" class="">ImDB</a>
           <div class="float-right  w-fit"  @click="toggle">
               <CardsHeartIcon class="icon" :class="{liked: isliked}" />
           </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { trimString, imdbIDUrl } from '@/utils'
    import { PropType, ref } from '@vue/runtime-core'
    import {MovieModel} from '../models/MovieModel'
    import CardsHeartIcon from 'vue-material-design-icons/CardsHeart.vue';
    
    const {movie}  =  defineProps({
        movie : Object as PropType<MovieModel>
    })
    
    const isliked = ref(false)

    const title = showTitle()
    
    function  toggle () {
          isliked.value =  !isliked.value 
      
    }

    function showTitle () {
        if(movie !=undefined){
              return trimString(movie.Title,30 )
        }
    }
        

</script>

<style scoped lang='sass'>
  .liked
     color: red
  
  .card-title
      height: 50px

</style>