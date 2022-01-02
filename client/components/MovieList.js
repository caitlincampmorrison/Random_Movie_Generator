import React from "react"
import {connect} from "react-redux"
import MovieItem from "./MovieItem"
import { addMovie } from "../store"

const MovieList = ( {movies, addMovie, average})  => {
     return (      
        <div id="movies-list">
            <p>The average rating is {average}!</p>
            <button id="generator_button" onClick={()=> addMovie() }>Generate Random Movie</button>
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie}/>
            ))}
        </div>
     )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies,
        average: state.average
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addMovie: () => dispatch(addMovie()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieList)

//<button id="generator_button" onClick={()=> addMovie() }>Generate Random Movie</button>
