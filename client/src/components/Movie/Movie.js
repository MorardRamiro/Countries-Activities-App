import React from 'react';
import { connect } from 'react-redux';
import { getMovieDetail } from '../../actions/index'; // Importo el action creator getMovieDetail...

import './Movie.css'; // Importo los estilos.

class Movie extends React.Component {

    componentDidMount() { // Cuando se  monte el componente, llama a getMovieDetail y mostra los datos
        const movieId = this.props.match.params.id; // manera convencional... 
        /* const { match: { params: { id }}} = this.props;*/ // usando destructuring
        this.props.getMovieDetail(movieId) // Despacho la action getMovieDetail con el id de la pelicula como parámetro...
    }

    render() {
        

        

        return (
            <div className="movie-detail">
                <h2>{this.props.movie.Title} ({this.props.movie.Year})</h2>
                <img src={this.props.movie.Poster} />
                <h4>{this.props.movie.Plot}</h4>
                <h4>{this.props.movie.Actors}</h4>
                <h4>{this.props.movie.BoxOffice}</h4>
                <h4>{this.props.movie.Country}</h4>
                <h4>{this.props.movie.DVD}</h4>
                <h4>{this.props.movie.Director}</h4>
                <h4>{this.props.movie.Genre}</h4>
                <h4>{this.props.movie.Language}</h4>
                <h4>{this.props.movie.Metascore}</h4>
                <h4>{this.props.movie.Production}</h4>
                <h4>{this.props.movie.Rated}</h4>
            </div>
        );
    }
}



/* export default (Movie); */


function mapStateToProps(state) {
    return {
      movie: state.movieDetail
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getMovieDetail: id => dispatch(getMovieDetail(id))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movie);