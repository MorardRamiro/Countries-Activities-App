import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Countries.css';

import { getCountries } from "../../actions/index.js"

export class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      page: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) {
    this.setState({ ...this.state, name: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.getCountries(this.state.name)
  };

  componentDidMount() {
    this.props.getCountries()
  };

  componentDidUpdate() {
    this.props.getCountries(this.state.name, this.state.page)
  };


  render() {
    const { name } = this.state;
    return (
      <div>

        <h2> Buscador </h2>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div>
            <label className="label"> Name: </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" onClick={this.props.getCountries}> SEARCH </button>
        </form>
        <h2> Countries </h2>
        <ul>
          {this.props.countries && Array.isArray(this.props.countries) && this.props.countries.map((e) => {
            return <li key={e.id}>
              <Link to={`/main/${e.id}`}>
                {e.name}
              </Link>
              {e.continent}
              <img src={e.flag}></img>
            </li>
          })}
        </ul>

        <div className="pagination">
          {this.state.page > 0 && <a href="#">&laquo;</a>}
          <a href="#">1</a>
          <a class="active" href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          {this.state.page !== Math.floor(this.props.countries.length / 10) && <a href="#">&raquo;</a>}
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    countries: state.countries
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getCountries: name => dispatch(getCountries(name)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countries);