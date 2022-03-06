import MovieListModel from "@/models/MoviesListModel";
import { request } from "@/utils";

class MovieService {


    static  async fetchMovies(page?: string) : Promise<MovieListModel>{
         
        var url = process.env.VUE_APP_MOVIES_BASE_URL as string 
        var queryObj = new URLSearchParams();
       
        if(page){
            queryObj.append(page, page)
        }
    
 
       var queryStr = queryObj.toString();
  
        if(queryStr.length >  0){
            url = url + queryStr;
        }

        console.log({url});
        
        return await request<MovieListModel>({url})
  
   }


}

export default MovieService