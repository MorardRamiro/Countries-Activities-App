import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountryDetail } from '../../actions/index';


class Country extends Component {

    componentDidMount() { 
        const countryId = this.props.match.params.id; 
        this.props.getCountryDetail(countryId);
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
                <h4> Activities: {this.props.country.activities && this.props.country.activities.map(e => {
                  return <div>
                    <h4>Activity: {e.name}</h4>
                    <h4>Difficulty: {e.difficulty}</h4>
                    <h4>Duration: {e.duration} hs </h4>
                    <h4>Season: {e.season}</h4>
                  </div>
                })} </h4>
            </div>
        );
    }
}

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