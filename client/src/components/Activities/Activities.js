import React, { Component } from "react";
import { connect } from "react-redux";

import { getCountriesToSelect } from '../../actions/index'
import { addActivity } from "../../actions/index.js"

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
  }

  componentDidMount () {
    this.props.getCountriesToSelect();
  }

  handleSubmit (e) {
    e.preventDefault();
    /* this.props.addActivity(this.state.input) */
    fetch("http://localhost:3001/activities", {method: "POST", headers: {'Content-Type': 'application/JSON'}, body: JSON.stringify(this.state.input)})
    .then(response => console.log(response))
  }

  handleInputChange (e) {
    if (e.target.name !== "countries") {
      this.setState({
        ...this.state,
        input: { ...this.state.input, [e.target.name]: e.target.value }
      });
    } else {
      if (!this.state.input[e.target.name].includes(e.target.value)) {
        this.setState({
          ...this.state,
          input: { ...this.state.input,
            [e.target.name]: [ ...this.state.input[e.target.name], e.target.value] }
        });
      }
      
    }

  };

  

  render() {
    return (
      <form>
        <div>
          <label>NAME:</label>
          <input /* className={errors.username && 'danger'} */
            type="text" name="name" onChange={this.handleInputChange} value={this.state.input["name"]} />
          {/* {errors.username && (
            <p className="danger">{errors.username}</p>
          )} */}
        </div>
        <div>
          <label>DIFFICULTY:</label>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value={1} /><a>1</a>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value={2} /><a>2</a>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value={3} /><a>3</a>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value={4} /><a>4</a>
          <input onClick={this.handleInputChange} type="radio" name="difficulty" value={5} /><a>5</a>
        </div>
        <div><label>DURATION:</label>
          <input type="time" name="duration" onChange={this.handleInputChange} /></div>
        <div>
          <label>SEASON:</label>
          <select name="season" onChange={this.handleInputChange}>
            <option value="Summer"> Summer </option>
            <option value="Autumn"> Autumn </option>
            <option value="Winter"> Winter </option>
            <option value="Spring"> Spring </option>
            </select>
        </div>
        <div>
          <label>COUNTRIES:</label>
          <select name="countries" onChange={this.handleInputChange}>
            {this.props.allCountries.count && this.props.allCountries.rows.map(country => {
              return <option value={country.id}>{country.name}</option>
            })}
            {/* <option value="ARG"> Argentina </option>
            <option value="URY"> Uruguay </option>
            <option value="PAR"> Paraguay </option>
            <option value="BOL"> Bolivia </option> */}
            </select>
        </div>
        <button type="submit" id="post-btn" onClick={this.handleSubmit}> CREATE </button>
        {/* <div>
          <label>Password:</label>
          <input className={errors.password && 'danger'} type="password" name="password" onChange={handleInputChange} value={input.password} />
          <input type="submit" value="Submit" />
          {errors.password && (
            <p className="danger">{errors.password}</p>)}
        </div> */}
      </form>)
  }

}
/* 
const button = document.getElementById('post-btn');

button.addEventListener('click', async () => {
  try {     
    const response = await fetch('http://localhost:3001/activities', {
      method: 'post',
      body: this.state.input
      
    });
    console.log('Completed!', response);
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}) */

function mapStateToProps(state) {
  return {
    allCountries: state.allCountries
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getCountriesToSelect: () => dispatch(getCountriesToSelect())
    /* addActivity: obj => dispatch(addActivity(obj)), */
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);