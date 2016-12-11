import React, { Component } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import InfoPanel from './InfoPanel';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showInfoPanel: false,
      movie: {
        _id: '',
        title: '',
        director: '',
        poster: '',
        plot: ''
      },
      movies: []
    };
  }

  handleInfoClick(movieInfo) {
    //Set the state, then show the component
    this.setState({
      movie: movieInfo,
      showInfoPanel: true
    })
  }//End handleInfoClick

  closeInfoPanel() {
    this.setState({showInfoPanel: false})
  }

  addNewMovie(newMovie) {
    const { title, director, poster, plot } = newMovie;
    // console.log('The new movie is: ' + poster);
    axios.post('/api/movie/', { title, director, poster, plot })
      .then(resp => {
        const movie = resp.data;
        this.setState({
            movies: [movie, ...this.state.movies]
          })
        })
      .catch(err => console.log(err));
  }

  deleteMovie(movieId) {
    //Get the current movie list
    const movies = this.state.movies;
    //Find the index of the movie that we want to delete
    const index = movies.map((movie) => movie._id).indexOf(movieId);
    //Create a new contacts array without the contact we want to delete
    const newMovies = movies.slice(0, index).concat(movies.slice(index+1));

    axios.delete(`/api/movie/${movieId}`)
      .then(resp => {
        this.setState(prev => {
          return {
            ...prev,
            movies: newMovies
          };
        });
      })
      .catch(err => console.log(err));
  }

  handleSearchBarClick(searchTerm) {
    //Search the OMDB API for the search term.
    axios.get(`http://www.omdbapi.com/?t=${searchTerm}&type=movie&plot=short&r=json`)
      .then(resp => {
        //If the movie can't be found in the OMDB API, alert the user
        if (resp.data.Response === 'False') {
          alert("Ain't no movie with the title " + searchTerm + ". Try again!");
        }
        else {
        //If the movie was found, set the current state of movie to the movie
        //found in the OMDB database and show it in the info panel.
        this.setState({
          movie: {
            _id: resp.data.imdbID,
            title: resp.data.Title,
            director: resp.data.Director,
            poster: resp.data.Poster,
            plot: resp.data.Plot
          },
          showInfoPanel: true
        })}
      })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>Awesome Movies</h1>
        <SearchBar onSearch={this.handleSearchBarClick.bind(this)} />
        {this.state.showInfoPanel ? <InfoPanel movie={this.state.movie} addNewMovie={this.addNewMovie.bind(this)} closeInfoPanel={this.closeInfoPanel.bind(this)}/> : null}
        <div className="movie-panel">
          <MovieList movies={this.state.movies} handleInfoClick={this.handleInfoClick.bind(this)} handleDelClick={this.deleteMovie.bind(this)} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios.get('/api/movie')
      .then(resp => {
        this.setState({
          movies: resp.data
        })
      })
      .catch(err => console.log(`Error! ${err}`));
  }

}//End App Component

export default App;
