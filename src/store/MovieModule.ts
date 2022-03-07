import MovieListModel from "@/models/MoviesListModel"
import MovieModel from "@/models/MovieModel"
import MovieService from "@/services/MovieService"
  import { VuexModule,  Module,  Mutation,  Action, MutationAction, getModule } from  "vuex-module-decorators"
  import store from "../store"
import { PageData } from "@/models/PaginationModel"

 @Module({ name: 'Mmodel', dynamic: true, store  })
 
 class MovieModule extends  VuexModule{
    
     movieList : MovieListModel = {} as MovieListModel
     favouriteMoveList :  Array<MovieModel> = []
     previousPage: number = 1
     hasData: boolean = false 
     searchValue : string  = ""
    
     @Mutation
     setMovies(movies: MovieListModel){
        if(!this.hasData){ 
            this.movieList = movies
            this.hasData = true
            console.log(this.movieList)
        }
        else{
             this.movieList.data.push(...movies.data)
             this.previousPage = this.movieList.page
             this.movieList.page = movies.page

             console.log(this.movieList)
        }

     }

     @Action({commit:'setMovies'})
     async AddMovies(page?: number){   
        return  await  MovieService.fetchMovies(page);
     }

     @Mutation
     setFavouriteMovie(movie: MovieModel){
        if(movie){ 
            movie.liked = true
            this.favouriteMoveList.push( movie)
        }
        
     }

      @Action({commit: 'setFavouriteMovie'})
      AddToFavourite(imdbID: string){ 
         return this.GetMovies.find( x=> x.imdbID == imdbID  )   
      }

     
     async getMoviesInPage(pageData: PageData){ 
         var data= this.pagedMovies(pageData);
         if(data.length  == 0){
            await this.AddMovies(pageData.pageNumber)
            data =  this.pagedMovies(pageData);
         }

         return  data;          
      }
      

    get GetMovies () {
        return this.movieList.data
    }

    pagedMovies(pageData: PageData){
        
        return this.GetMovies.filter( (x,index) => index >=  pageData.dataStartPos 
                                         &&  index <=  pageData.dataEndPos )
    }
    
 
    get page () {
        return this.movieList.total
    }
     
    get  totalItems() {
        return this.movieList.total
    }

    get  showPerPage() {
        return this.movieList.per_page
    }
    get  currentPage() {
        return this.movieList.page
    }

 }

 export default getModule(MovieModule)

