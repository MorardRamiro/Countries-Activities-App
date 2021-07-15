import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Countries.css';

import { getCountries, getAllActivities } from "../../actions/index.js"

export class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      page: 0,
      order: "ASC",
      orderBy: "name",
      continent: "",
      activity: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectPage = this.selectPage.bind(this);
  };


  handleChange(e) {
    
    this.setState({ ...this.state, [e.target.name]: e.target.value, page: 0 });
  };

  selectPage(e) {
    e.preventDefault();
    switch (e.target.name) {
      case "first":
        this.setState({ ...this.state, page: 0 });
        break;
      case "prev":
        if (this.state.page > 0) this.setState({ ...this.state, page: Number(this.state.page - 1) });
        break;
      case "next":
        this.setState({ ...this.state, page: Number(this.state.page + 1) });
        break;
      case "last":
        this.setState({ ...this.state, page: Math.ceil(this.props.countries.count / 10) - 1 });
        break;
      case "page":
        this.setState({ ...this.state, [e.target.name]: Number(e.target.value) });
        break;
      default:
        break;
    }

  }

  componentDidMount() {
    this.props.getCountries(this.state);
    this.props.getAllActivities();
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.props.getCountries(this.state);
    }
  };
  


  render() {
    const { name } = this.state;
    return (
      <div>
        <div>
          <h2>FILTER BY ACTIVITIES</h2>
          <form><select name="activity" onChange={this.handleChange}>
          <option disabled selected hidden value> -- select an activity -- </option>
          <option name="activity" value=""> Any </option>
            {this.props.allActivities && this.props.allActivities.map(e => <option name="activity" value={e.name}>{e.name}</option>)}
          </select>
          <button type="reset" name="activity" onClick={this.handleChange} value=""> RESET </button></form>  
        </div>
        <div>
          <h2>FILTER BY CONTINENT</h2><form>
          <select name="continent" onChange={this.handleChange}>
          <option disabled selected hidden value> -- select a continent -- </option>
          <option name="continent" value=""> All </option>
          <option name="continent" value="Africa">Africa</option>
          <option name="continent" value="Americas">Americas</option>
          <option name="continent" value="Asia">Asia</option>
          <option name="continent" value="Europe">Europe</option>
          <option name="continent" value="Oceania">Oceania</option>
          <option name="continent" value="Polar">Polar</option>
            </select>  
            <button type="reset" name="continent" onClick={this.handleChange} value=""> ALL </button></form>        
        </div>
        <div>
          <h2>ORDER BY</h2>
          NAME: <input onClick={this.handleChange} id="name" class="checkbox" name="orderBy" type="radio" value="name" defaultChecked />
          POPULATION: <input onClick={this.handleChange} id="pop" class="checkbox" name="orderBy" type="radio" value="population" />
        </div>

        <div>
          <h2>ORDER</h2>
          ASC: <input onClick={this.handleChange} id="asc"  class="checkbox" name="order" type="radio" value="ASC" defaultChecked />
          DESC: <input onClick={this.handleChange} id="desc"  class="checkbox" name="order" type="radio" value="DESC" />
        </div>

        <div className="pagination">
        {<a><button disabled={this.state.page > 0 ? "" : "yes"} name="first" type="button" onClick={this.selectPage}> « </button></a>}
          {<a><button disabled={this.state.page > 0 ? "" : "yes"} name="prev" type="button" onClick={this.selectPage}> ‹ </button></a>}
          {this.props.countries.count && Array(Math.ceil(this.props.countries.count / 10)).fill().map((x, e) => {
            return <a class={this.state.page === e ? "active" : ""}><button onClick={this.selectPage} name="page" value={e}>{e+1}</button></a>
          })}
          {<a><button disabled={this.state.page < Math.ceil(this.props.countries.count / 10) - 1 ? "" : "yes"} name="next" type="button" onClick={this.selectPage}> › </button></a>}
          {<a><button disabled={this.state.page < Math.ceil(this.props.countries.count / 10) - 1 ? "" : "yes"} name="last" type="button" onClick={this.selectPage}> » </button></a>}
        </div>

        <h2> Buscador </h2>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div>
            <label className="label"> Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              value={name}
              onChange={this.handleChange}
            />
            <button name="name" onClick={this.handleChange} value=""> RESET </button>  
          </div>
        </form>
        <h2> Countries </h2>
        <ul>
          {this.props.countries.count && this.props.countries.rows.map((e) => {
            return <li key={e.id}>
              <img src={e.flag}></img>
              <Link to={`/main/${e.id}`}>
                {e.name}
              </Link>
              {e.continent}
            </li>
          })}
        </ul>


      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    countries: state.countries,
    allActivities: state.allActivities
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getCountries: name => dispatch(getCountries(name)),
    getAllActivities: () => dispatch(getAllActivities())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Countries);