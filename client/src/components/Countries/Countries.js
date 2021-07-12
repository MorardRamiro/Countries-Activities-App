import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
// import './Favorites.css';

import { removeMovieFavorite, getCountries } from "../../actions/index.js"

export class Countries extends Component {
    
    componentDidMount() { // Cuando se  monte el componente, llama a getMovieDetail y mostra los datos
        // const movieId = this.props.match.params.id; // manera convencional... 
        /* const { match: { params: { id }}} = this.props;*/ // usando destructuring
        this.props.getCountries() // Despacho la action getMovieDetail con el id de la pelicula como parámetro...
    }

  render() {
    return (
      <div>
        <h2> Countries </h2>
         <ul>
          {this.props.countries && this.props.countries.map((e)=> {
            return <li key={e.id}>
              <Link to={`/countries/${e.id}`}>
            {e.name}
            </Link>
            {e.continent}
            <img src={e.flag}></img>
          </li>
          })}
        </ul> 
      </div>
    );
  } 
}

function mapStateToProps(state) {
    return {
      countries: state.countries
    };
  };

  function mapDispatchToProps(dispatch) {
    return {
      getCountries: () => dispatch(getCountries()),
    };
  }

export default connect (
    mapStateToProps,
    mapDispatchToProps
    ) (Countries);

/* function mapStateToProps(state) {
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
)(ConnectedList);*/