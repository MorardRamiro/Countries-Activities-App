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
      <div class="map"> 
        
         <div className="column half">
        <div className="space"><h1 className="whitebackground lessthanhalf"> Countries around the World... </h1></div>
        <div className="search-box">
            <input
              className="input"
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              placeholder="Enter a name..."
              value={name}
              onChange={this.handleChange}
            />
            <button className="btn" name="name" onClick={this.handleChange} value=""> RESET </button>  
          </div>
        <div className="pagination">
        {<button class="btn" disabled={this.state.page > 0 ? "" : "yes"} name="first" type="button" onClick={this.selectPage}> « </button>}
          {<button class="btn" disabled={this.state.page > 0 ? "" : "yes"} name="prev" type="button" onClick={this.selectPage}> ‹ </button>}
          {this.props.countries.count && Array(Math.ceil(this.props.countries.count / 10)).fill().map((x, e) => {
            return <button className={this.state.page === e ? "btn active" : (this.state.page <= 4 && e >= 7) ? "hide" : (this.state.page>4 && (e< this.state.page - 3 || e> this.state.page + 3)) ? "hide" : "btn"} onClick={this.selectPage} name="page" value={e}>{e+1}</button>
          })}
          {<button class="btn" disabled={this.state.page < Math.ceil(this.props.countries.count / 10) - 1 ? "" : "yes"} name="next" type="button" onClick={this.selectPage}> › </button>}
          {<button class="btn" disabled={this.state.page < Math.ceil(this.props.countries.count / 10) - 1 ? "" : "yes"} name="last" type="button" onClick={this.selectPage}> » </button>}
        </div>
        <ul>
          {this.props.countries.count && this.props.countries.rows.map((e) => {
            return <li key={e.id}>
              <Link to={`/main/${e.id}`}><img src={e.flag}>
                </img>
                </Link>
                <div className="whitebackground">
              <div>
                <Link to={`/main/${e.id}`}>
                {e.name}
              </Link>
              </div>
              <div>{e.continent}</div>
            </div></li>
          })}
        </ul>
</div>
<div className="column last">
        <form className="form-container whitebackground">
        <div className="input">
          <h2>Order by</h2>
          <div>Name/alphabetically: <input onClick={this.handleChange} class="checkbox" name="orderBy" type="radio" value="name" defaultChecked /></div>
          <div>Population size: <input onClick={this.handleChange} class="checkbox" name="orderBy" type="radio" value="population" /></div>
        </div>

        <div className="input">
          <h2>Order</h2>
         <div> Ascending: <input onClick={this.handleChange} class="checkbox" name="order" type="radio" value="ASC" defaultChecked /></div>
         <div> Descending: <input onClick={this.handleChange} class="checkbox" name="order" type="radio" value="DESC" /></div>
        </div>
        <div>
          <h2>Filter by an activity</h2>
          <form>
            <select className="btn" name="activity" onChange={this.handleChange}>
          <option disabled selected hidden value> -- Select an activity -- </option>
          <option name="activity" value=""> Any </option>
            {this.props.allActivities && this.props.allActivities.map(e => <option name="activity" value={e.name}>{e.name}</option>)}
          </select>
          <button className="btn" type="reset" name="activity" onClick={this.handleChange} value=""> RESET </button></form>  
        </div>
        <div>
          <h2>Filter by continent</h2><form>
          <select className="btn" name="continent" onChange={this.handleChange}>
          <option disabled selected hidden value> -- Select a continent -- </option>
          <option name="continent" value=""> All </option>
          <option name="continent" value="Africa">Africa</option>
          <option name="continent" value="Americas">Americas</option>
          <option name="continent" value="Asia">Asia</option>
          <option name="continent" value="Europe">Europe</option>
          <option name="continent" value="Oceania">Oceania</option>
          <option name="continent" value="Polar">Polar</option>
            </select>  
            <button className="btn" type="reset" name="continent" onClick={this.handleChange} value=""> ALL </button></form>        
        </div>
        
        </form>
</div>

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