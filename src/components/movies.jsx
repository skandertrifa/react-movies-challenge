import React, { Component } from 'react';
import { movies$ } from '../services/movies';
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import _ from "lodash";
import MoviesCards from './moviesCards';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null,
    };

    async componentDidMount() {
      let movies;
      await movies$.then(res => {
        movies = res;
        this.setState({ movies: res});
      });

      this.getGenres(movies);
    }

    handlePageChange = page => {
      this.setState({ currentPage: page });
    };
    handlePageSizeChange = (event) => {
      console.log(event.target.value);
      this.setState({ pageSize: event.target.value });
    };

    //handleLike = movie => {
    //    const movies = [...this.state.movies];
    //    const index = movies.indexOf(movie);
    //    movies[index] = { ...movies[index] };
    //    movies[index].liked = !movies[index].liked;
    //    this.setState({ movies });
    //};

    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m.id !== movie.id);
        this.setState({ movies });
        this.getGenres(movies);
    };

    handleGenreSelect = genre => {
      this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    getGenres = (movies) => {
      const genres = [];
      movies.forEach(element => {
        genres.push(element.category);
      });
      const uniqueGenres = genres.filter((item, i, ar) => ar.indexOf(item) === i);
      const genresItems = [{ name: "All"}];
      uniqueGenres.forEach(element => {
        genresItems.push( { name: element});
      });
      this.setState({ genres: genresItems});
    }

    getPagedData = () => {
        const {
          pageSize,
          currentPage,
          selectedGenre,
          movies: allMovies
        } = this.state;
    
        let filtered = allMovies;
        
        //const sorted = filtered;
        
        if (selectedGenre ){
          if ( selectedGenre.name !== "All")
            filtered = allMovies.filter(m => m.category === selectedGenre.name);
          
        }    
        const movies = paginate(filtered, currentPage, pageSize);
    
        return { totalCount: filtered.length, data: movies };
    };


    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data: movies } = this.getPagedData();
        return (
            <div className="row">
              {this.state.genres.length > 0 &&
                <div className="col-sm-3 mt-5">
                <ListGroup
                  items={this.state.genres}
                  selectedItem={this.state.selectedGenre}
                  onItemSelect={this.handleGenreSelect}
                />
              </div>
              }
              
              <div className="col-sm-9 ">
                <p>Showing {totalCount} movies in the database.</p>
                 <MoviesCards
                  movies={movies}
                  onDelete={this.handleDelete}
                /> 
                <div className="row justify-content-between">
                  <div className="col-sm-8 ">
                    <Pagination
                      itemsCount={totalCount}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                  {totalCount > 0 &&
                    <div className="col-sm-2">
                    <select onChange={this.handlePageSizeChange} class="custom-select custom-select-sm">
                      <option selected value="4">4</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                      </select>
                  </div>
                  }
                  <div className="col-sm-2 "></div>
                  
                </div>
              </div>
            </div>
          );
        }
    }

 
export default Movies;