import React, { Component } from "react";
import { connect } from "react-redux";

import { addActivity, getCountriesToSelect } from '../../actions/index'

import './Activities.css';

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],

      },
      errors: {
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
    this.validateAll = this.validateAll.bind(this);
  };

  validateAll (e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      errors: validate(this.state.input)
    });
  }

  /* componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.input) !== JSON.stringify(this.state.input)) {
      this.setState({
        ...this.state,
        errors: validate(this.state.input)
      })
    }
  } */

  componentDidMount() {
    this.props.getCountriesToSelect();
  };

  handleSubmit() {
    this.props.addActivity(this.state.input);
  };

  handleInputChange(e) {
    if (e.target.name !== "countries") {
      this.setState({
        ...this.state,
        input: { ...this.state.input, [e.target.name]: e.target.value }

      });
    } else {
      if (!this.state.input[e.target.name].includes(e.target.value)) {
        this.setState({
          ...this.state,
          input: {
            ...this.state.input,
            [e.target.name]: [...this.state.input[e.target.name], e.target.value]
          }
        });
      }
    }
  };

  deleteCountry(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      input: { ...this.state.input, countries: [...this.state.input.countries].filter(elem => elem !== e.target.value) }
    })
  };



  render() {
    return (
      <div className="map">
        <div className="elper"> <h1 className="whitebackground muchless">Create a new activity</h1></div>
        <div className="elper">
          <div className="columns halfs whitebackground">

            <div className="input">
              <h2>Name of the activity:</h2>
              <input placeholder="Enter a name..." className={this.state.errors.name ? 'danger' : "input"}
                type="text" name="name" onChange={this.handleInputChange} value={this.state.input["name"]} />
              {this.state.errors.name && (
                <p className="danger">{this.state.errors.name}</p>
              )}
            </div>
            <div className="input">
              <h2>Difficulty:</h2>
              <input onClick={this.handleInputChange} type="radio" name="difficulty" value={1} /><a>1</a>
              <input onClick={this.handleInputChange} type="radio" name="difficulty" value={2} /><a>2</a>
              <input onClick={this.handleInputChange} type="radio" name="difficulty" value={3} /><a>3</a>
              <input onClick={this.handleInputChange} type="radio" name="difficulty" value={4} /><a>4</a>
              <input onClick={this.handleInputChange} type="radio" name="difficulty" value={5} /><a>5</a>
              {this.state.errors.difficulty && (
                <p className="danger">{this.state.errors.difficulty}</p>)}
            </div>
            <div className="input">
              <h2>Duration:</h2>
              <input type="time" name="duration" onChange={this.handleInputChange} />
              {this.state.errors.duration && (
                <p className="danger">{this.state.errors.duration}</p>)}
            </div>
            
          </div>
          <div className="columns lasts whitebackground">
            <div className="input">
              <h2>Season in which it can take place:</h2>
              <select className="input" name="season" onChange={this.handleInputChange}>
                <option disabled selected hidden value> -- Select a season -- </option>
                <option value="Summer"> Summer </option>
                <option value="Autumn"> Autumn </option>
                <option value="Winter"> Winter </option>
                <option value="Spring"> Spring </option>
              </select>
              {this.state.errors.season && (
                <p className="danger">{this.state.errors.season}</p>)}
            </div>
            <div className="input">
              <h2>Countries in which this activity is available:</h2>
              <select className="input" name="countries" onChange={this.handleInputChange}>
                <option disabled selected hidden value> -- Select countries -- </option>
                {this.props.allCountries.count && this.props.allCountries.rows.map(country => {
                  return <option value={country.id}>{country.name}</option>
                })}
              </select>
              {this.state.errors.countries && (
                <p className="danger">{this.state.errors.countries}</p>)}
              
            </div>
            <div className="input"><button className="btn" type="submit" id="post-btn" onClick={Object.keys(validate(this.state.input)).length ? this.validateAll : this.handleSubmit}> <h2>CREATE</h2> </button></div>
          </div>
          <div className="whitebackground">
            <h2>Selected countries:</h2>
            <ul className="list">
                {this.state.input.countries && this.state.input.countries.map(e => <li className="list" value={e}><button className="btn" value={e} onClick={this.deleteCountry}> X </button>{this.props.allCountries.rows.find(elem => elem.id === e).name}</li>)}
              </ul>
          </div>
        </div>
      </div>)
  }

}

function validate(input) {
  let errors = {};
  if (!input.name || input.name === "") {
    errors.name = 'A name is required';
  } else if (!/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/.test(input.name)) {
    errors.name = 'Name is invalid';
  }
  if (!input.difficulty) {
    errors.difficulty = "A difficulty must be selected";
  }
  if (!input.duration) {
    errors.duration = "A duration must be selected";
  }
  if (!input.season) {
    errors.season = "A season must be selected";
  }
  if (!input.countries.length) {
    errors.countries = "At least one country must be selected";
  }

     /*} else if (!/^[1-5]{1,1}$/.test(input.difficulty)) {
      errors.difficulty = "Difficulty can only be between 1 and 5"
    } */

  return errors;
}

function mapStateToProps(state) {
  return {
    allCountries: state.allCountries
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getCountriesToSelect: () => dispatch(getCountriesToSelect()),
    addActivity: obj => dispatch(addActivity(obj)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);