import React, { Component } from 'react';
import Movie from './Movie';

class MovieList extends Component {
  render() {
    const { movies } = this.props;
    return(
      <div className='container'>
        {movies.map(movie => {
          return(
            <Movie
              key={movie._id}
              id={movie._id}
              title={movie.title}
              director={movie.director}
              poster={movie.poster}
              plot={movie.plot}
              handleInfoClick={this.props.handleInfoClick.bind(this)}
              handleDelClick={this.props.handleDelClick.bind(this)}
            />
          )
        }
      )}
      </div>
    );
  }
}//End MovieList

export default MovieList;
