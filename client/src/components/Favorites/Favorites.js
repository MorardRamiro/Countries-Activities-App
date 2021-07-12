import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Favorites.css';

import { removeMovieFavorite } from "../../actions/index.js"

export class ConnectedList extends Component {

  render() {
    return (
      <div>
        <h2>Películas Favoritas</h2>
        <ul>
          {this.props.movies && this.props.movies.map((e)=> {
            return <li key={e.imbdID}> <Link to={`/movie/${e.imdbID}`}>
            {e.Title}
          </Link> <button onClick={() => this.props.removeMovieFavorite(e.imdbID)}>X</button></li>
          })/* Aqui deberias poner tu lista de peliculas! */}
        </ul>
      </div>
    );
  } 
}



/* export default (ConnectedList); */

function mapStateToProps(state) {
  return {
    movies: state.moviesFavourites
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMovieFavorite: movie => dispatch(removeMovieFavorite(movie)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedList);
