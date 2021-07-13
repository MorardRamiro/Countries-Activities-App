import React, { Component } from "react";
import { connect } from "react-redux";

export class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: "",
        difficulty: 0,
        duration: "00:00",
        season: "",
        countries: []
      },
      errors: {

      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      input:{ ...this.state.input, [e.target.name]: e.target.value}   
    });
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
        <input type = "time" name="duration" onChange={this.handleInputChange} /></div>
        <div>
          <label>SEASON:</label>
          <input type="text" name="season" list="seasons" autocomplete="off" onChange={this.handleInputChange} />
            <datalist id="seasons">
              <option value="Summer" />
                <option value="Autumn" />
                <option value="Winter" />
                <option value="Spring" />
            </datalist>
        </div>
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

function mapStateToProps(state) {
  return {
    
  };
};

function mapDispatchToProps(dispatch) {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);