import React from 'react';
import { connect } from 'react-redux'
import { fetchMovies, calcAverage } from '../store'
//import { calcAverage } from '../store'
import MovieList from './MovieList'

class Main extends React.Component {
  async componentDidMount(){
    await this.props.fetchMovies()
    this.props.calcAverage()
  }

  render(){
    return (
      <div id="main">
          <MovieList />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    calcAverage: () => dispatch(calcAverage())
  };
};

export default connect(null, mapDispatchToProps)(Main)
