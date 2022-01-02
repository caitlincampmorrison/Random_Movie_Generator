import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
const faker = require('faker')

//ACTION TYPES
const FETCH_MOVIES_FROM_SERVER = "FETCH_MOVIES_FROM_SERVER"
const ADD_MOVIE = "ADD_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"
const CALC_AVERAGE = "CALC_AVERAGE"
const ADD_STARS = "ADD_STARS"
const REMOVE_STARS = "REMOVE_STARS"

//ACTION CREATORS

export const calcAverage = () => ({
    type: CALC_AVERAGE
});


//THUNK ACTION CREATORS
export const fetchMovies = () => {
    return async (dispatch) => {
      const { data } = await axios.get("/api/movies");
      dispatch({ type: FETCH_MOVIES_FROM_SERVER, movies: data });
    };
};

export const addMovie = () => {
    return async(dispatch) => {
        const title = faker.commerce.department()
        //const title = "Test"
        console.log("TITLE " + title)
        const { data } = await axios.post('/api/movies', { title })
        dispatch({ type: ADD_MOVIE, movies: data })
        dispatch({ type: CALC_AVERAGE })
    }
}
export const deleteMovie = (movie) => {
    console.log("delete movie: " + movie.title + movie.id)
    return async (dispatch) => {
        console.log("DATA")
      const data = await axios.delete(`/api/movies/${movie.id}`);
      dispatch({ type: DELETE_MOVIE, movie: movie.id })
      dispatch({ type: CALC_AVERAGE })
    };
};

export const addStars = (movie) => {
    return async(dispatch) => {
        console.log(movie.stars)
        const stars = movie.stars + 1
        console.log("ADD STAR " + stars)
        const { data } = await axios.put(`/api/movies/${movie.id}`, {stars})
        dispatch({ type: ADD_STARS, movie: movie.id })
        dispatch({ type: CALC_AVERAGE })
    }
}

export const removeStars = (movie) => {
    return async(dispatch) => {
        console.log(movie.stars)
        const stars = movie.stars - 1
        console.log("REMOVE STAR " + stars)
        const { data } = await axios.put(`/api/movies/${movie.id}`, {stars})
        dispatch({ type: ADD_STARS, movie: movie.id})
        dispatch({ type: CALC_AVERAGE })
    }
}

//INITIAL STATE
const initialState = {
    movies: [],
    average: 0
};

//REDUCER
const reducer = ( state = initialState, action) => {

    switch(action.type) {
        case FETCH_MOVIES_FROM_SERVER:
            return { ...state, movies: action.movies}
        case ADD_MOVIE:
            return { ...state, movies: [...state.movies, action.movies]} 
        case DELETE_MOVIE:
            return { ...state, movies: state.movies.filter((movie)=>movie.id !== action.movie)}
        case ADD_STARS:
            return { ...state, movies: [...state.movies, action.movies]}
        case REMOVE_STARS:
            return { ...state, movies: [...state.movies, action.movies]}
        case CALC_AVERAGE: 
            let avg 
            if(state.movies.length === 0){
                avg = 0
            }
            else{
                const sum = state.movies.reduce((prev, curr)=> prev + curr.stars, 0)
                avg = sum/state.movies.length
            }
            return { ...state, average: avg}
        default: 
            return state
    }
}

//STORE
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, loggerMiddleware)))

export default store