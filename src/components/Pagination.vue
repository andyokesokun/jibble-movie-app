<template>
    <div class="pagination">
    <button type="button" 
            @click="onClickFirstPage"
            :disabled="isInFirstPage">
            First
    </button>

   <button 
        type="button" 
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
      >
          &laquo;
      </button>
    
    <ul>
       <li v-for="page in pages" href="#" 
                 class="pagination-item" 
                :class="{ active: isPageActive(page.name) }" 
                 @click="onClickPage(page.name)"
                :disabled="page.isDisabled"       
                :key="page.name"
                > {{page.name}} </li>
    </ul>

    <button 
        type="button" 
        @click="onClickNextPage"    
        :disabled="isInLastPage"
        aria-label="Go to next page">
        &raquo;
    </button>

    <button type="button" 
        @click="onClickLastPage"
        :disabled="isInLastPage"
        aria-label="Go to last page">Last</button>
    </div>
</template>

<script  setup lang="ts">
import { computed, PropType, ref } from "@vue/runtime-core";
import {PaginationType, PageData}  from '@/models/PaginationModel'


   interface  PaginationProp{
        currentPage: number
        itemsPerPage: number,
        totalItems : number,
        maxVisible : number
        paginationType? : string
}


   const {itemsPerPage, totalItems, maxVisible, currentPage, paginationType = PaginationType.Horizontal} = defineProps<PaginationProp>()

   
   const totalPages = ref(totalItems/itemsPerPage)

   
   const emit = defineEmits<{
        (e: 'pageChanged', data: PageData ) : void
   }>()   





   const startPage = computed( () => {
      
      console.log(`start:${startPage.value} totalPage: ${totalPages.value} maxVisible :${maxVisible}`)
      if (currentPage === 1) 
            return 1;
        
       // When on the last page
      if (currentPage === totalPages.value) {
          return totalPages.value - maxVisible;
      }

      // When inbetween
      return currentPage - 1;
   });


   const  endPage = computed( () => {
       console.log(`start:${startPage.value} totalPage: ${totalPages.value} maxVisible :${maxVisible}`)
       return Math.min( (startPage.value + maxVisible - 1) ,totalPages.value) 
   
   } )



   const pages = computed( () => {
        const range = [];
        console.log("s", startPage.value);
        for (let i = startPage.value;
            i <= endPage.value;
            i++
        ) {
            range.push({
            name: i,
            isDisabled: i === currentPage
            });
        }
        
        return range;
    })

  
  const isInFirstPage = computed( () =>  {
      return currentPage === 1;
    })

  const isInLastPage = computed( () => {
       return currentPage === totalPages.value;
    })
   
   
  const pageData = (currentPage: number) => {
        var pageNumber = currentPage
        var dataEndPos =  pageNumber * itemsPerPage
        var dataStartPos  = dataEndPos / itemsPerPage

        return {dataStartPos, dataEndPos, pageNumber} as PageData
  }

   
   const onClickFirstPage = () => { emit("pageChanged",pageData(1)) }
    
  const onClicklickPreviousPage = () => { emit("pageChanged",pageData(currentPage - 1)) }
    
  const  onClickPage = (page:number) => { emit("pageChanged",pageData(page)) }
    
  const  onClickNextPage = () =>{ emit("pageChanged",pageData(currentPage + 1)) }

  const onClickLastPage = () =>{ emit("pageChanged",pageData(totalPages.value)) }

  const isPageActive = (page: number) => ( currentPage === page )
    
    
</script>

<style scoped lang="sass">

%page-item
    color: black
    float: left
    padding: 8px 16px
    text-decoration: none
    transition: background-color .3s
    border: 1px solid #ddd

.pagination ul
    list-style-type: none
    margin: 0
    margin-block-start: 0
    padding-inline-start: 0

li
  display: inline-block
 

.pagination 
    .pagination-item
      @extend %page-item
    button
      @extend %page-item


.pagination li.active 
  background-color: #4CAF50
  color: white
  border: 1px solid #4CAF50


.pagination li:hover:not(.active) 
      background-color: #ddd
</style>