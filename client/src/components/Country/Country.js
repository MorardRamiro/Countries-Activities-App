import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountryDetail } from '../../actions/index'; // Importo el action creator getMovieDetail...

// import './Movie.css'; // Importo los estilos.

class Country extends Component {

    componentDidMount() { // Cuando se  monte el componente, llama a getMovieDetail y muestra los datos
        const countryId = this.props.match.params.id; // manera convencional... 
        /* const { match: { params: { id }}} = this.props;*/ // usando destructuring
        this.props.getCountryDetail(countryId) // Despacho la action getMovieDetail con el id de la pelicula como parámetro...
    }

    render() {
        return (
            <div className="country-detail">
                <h2> {this.props.country.name} ({this.props.country.id}) </h2>
                <img src={this.props.country.flag} />
                <h4> Continent: {this.props.country.continent} </h4>
                <h4> Capital: {this.props.country.capital} </h4>
                <h4> Region: {this.props.country.region} </h4>
                <h4> Area: {this.props.country.area} km² </h4>
                <h4> Population: {this.props.country.population} </h4>
                <h4> Activities: {this.props.country.activities} </h4>
            </div>
        );
    }
}



/* export default (Movie); */


function mapStateToProps(state) {
    return {
      country: state.countryDetails
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getCountryDetail: id => dispatch(getCountryDetail(id))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  ) (Country);