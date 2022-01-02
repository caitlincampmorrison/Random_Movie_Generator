import React from "react"
import {connect} from "react-redux"
import {deleteMovie, addStars, removeStars} from "../store"

const MovieItem = ({movie, deleteMovie, addStars, removeStars}) => {
    return (
        <div className="movie-item">
            <button onClick={()=>deleteMovie(movie)}>x</button>
            <p> {movie.title}   ({movie.stars})</p>
            <button onClick={() => removeStars(movie)}>-</button>
            <button onClick={() => addStars(movie)}>+</button>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      deleteMovie: (movie) => dispatch(deleteMovie(movie)),
      addStars: (movie) => dispatch(addStars(movie)),
      removeStars: (movie) => dispatch(removeStars(movie))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);