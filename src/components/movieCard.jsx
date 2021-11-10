import React, { Component } from 'react';
const coolImages = require("cool-images");


const MovieCard = 
    ({movie, onDelete}) => 
    {
        const ratio = ((movie.likes/(movie.dislikes+movie.likes))*100).toFixed(2);
        return ( <div className="card col-lg-5 col-sm-6 m-1" style={{width: '18rem'}}>
        <img src={coolImages.one()} className="card-img-top" alt="..."/>
        <div className="card-body">
        <div class="row">
            <h5 className="card-title col-sm-8">{movie.title}</h5>
            <p className="card-title col-sm-4">{movie.category}</p>
        </div>
        <div className="row justify-content-center">
            <div className="col-sm-3"> </div>
            <div className="col-sm-4">
                <p className="card-text"> {movie.likes} <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></p>
            </div>
            <div className="col-sm-3">
                <p className="card-text"> {movie.dislikes} <i class="fa fa-thumbs-o-down" aria-hidden="true"></i></p>
            </div>
            <div className="col-sm-2"> </div>
        </div>
        <div className="progress" style={{height: '5px'}}>
             <div className="progress-bar bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                style={{width: ratio + '%' }} >
             </div>
             <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
                style={{width: (100-ratio) + '%' }} >
             </div>
        </div>
        <div className="row justify-content-center mt-1">
            <button onClick={() => onDelete(movie)} className="col-sm-2 btn btn-danger" >
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>    
        </div>
        </div> );
    }
 
export default MovieCard;
