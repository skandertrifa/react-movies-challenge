import React, { Component } from 'react';
import MovieCard from './movieCard';



class MoviesCards extends Component {
  
      
    render() {
        const { movies,onDelete } = this.props;
    
        return (
          <div className="row">
            {movies.map(item => (
             <MovieCard movie={item} onDelete={onDelete}/>
            ))}
          </div>
        );
    }
}

export default MoviesCards;