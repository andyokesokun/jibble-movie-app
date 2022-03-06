  import MovieListModel from "@/models/MoviesListModel"
import MovieService from "@/services/MovieService"
  import { VuexModule,  Module,  Mutation,  Action, MutationAction, getModule } from  "vuex-module-decorators"
  import store from "../store"

 @Module({ name: 'Mmodel', dynamic: true, store  })
 
 class MovieModule extends  VuexModule{
    
     private movieList : MovieListModel = {} as MovieListModel
     previousPage: number = 1
     hasData: boolean = false 
     searchValue : string  = ""
    
     @Mutation
     setMovies(movies: MovieListModel){
        if(!this.hasData){ 
            this.movieList = movies
            this.hasData = true
        }
        else{
             this.movieList.data.push(...movies.data)
             this.previousPage = this.movieList.page
             this.movieList.page = movies.page
        }

     }

     @Action({commit:'setMovies'})
     async AddMovies(){   
        return  await  MovieService.fetchMovies();
     }

    get GetMovies () {
        return this.movieList.data
    }
    
    get totalPages () {
        return this.movieList.total_pages
    }

    get totalItems () {
        return this.movieList.total
    }

    get  showPerPage() {
        return this.movieList.per_page
    }

 }

 export default getModule(MovieModule)

