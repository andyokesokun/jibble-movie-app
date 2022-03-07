import MovieModel  from "./MovieModel"

export default interface MovieListModel{
    page : number,
    per_page : number,
    total:  number,
    total_pages : number, 
    data : Array<MovieModel>
 
} 
 
