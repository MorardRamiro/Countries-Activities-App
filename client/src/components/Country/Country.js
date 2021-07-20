import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountryDetail } from '../../actions/index';
import './Country.css';


class Country extends Component {

    componentDidMount() { 
        const countryId = this.props.match.params.id; 
        this.props.getCountryDetail(countryId);
    }

    render() {
        return (<div className="nice map flag">
            <div className="country-detail whitebackground">
                <div className="flag"><h1> {this.props.country.name} ({this.props.country.id}) </h1>
                <img alt="" src={this.props.country.flag} /></div>
                <p>{this.props.country.name} (ISO 3166-1 alpha-3 code: {this.props.country.id}) is a country on the continent of {this.props.country.continent}, located in the sub-region of {this.props.country.region}. It's capital is {this.props.country.capital}. It has an estimated population of {this.props.country.population} inhabitants, spread across an area of {this.props.country.area}  km².</p>
                {/* <h4> Continent: {this.props.country.continent} </h4>
                <h4> Capital: {this.props.country.capital} </h4>
                <h4> Region: {this.props.country.region} </h4>
                <h4> Area: {this.props.country.area} km² </h4>
                <h4> Population: {this.props.country.population} </h4> */}
                <h4> {(this.props.country.activities && this.props.country.activities.length) ? <div> The following activities are currently availabe to do in this country:<ul>{this.props.country.activities.map(e => {
                  return <li key={e.id} className="whitebackground">
                    <h4>{e.name}</h4>
                    <h4>Difficulty: {e.difficulty}/5</h4>
                    <h4>Duration: {e.duration} hs </h4>
                    <h4>Season: {e.season}</h4>
                  </li>
                })}</ul></div> : <p>There are currently no available activities to do on this country...</p>} </h4>
            </div></div>
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