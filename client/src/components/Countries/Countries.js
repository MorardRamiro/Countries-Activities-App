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
      page: 0,
      order: "ASC",
      orderBy: "name"
    };
    this.handleChange = this.handleChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.changeOrderBy = this.changeOrderBy.bind(this)
  };

  changeOrder(e) {
    this.setState({ ...this.state, order: e.target.value, page: 0 });
  };

  changeOrderBy(e) {
    this.setState({ ...this.state, orderBy: e.target.value, page: 0 });
  };

  handleChange(e) {
    this.setState({ ...this.state, name: e.target.value, page: 0 });
  };

  nextPage(e) {
    e.preventDefault();
    this.setState({ ...this.state, page: this.state.page + 1 });
  };

  previousPage(e) {
    e.preventDefault();
    if (this.state.page > 0) this.setState({ ...this.state, page: this.state.page - 1 });
  };

  componentDidMount() {
    this.props.getCountries(this.state);
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.props.getCountries(this.state)
    }
  };


  render() {
    const { name } = this.state;
    return (
      <div>

        <div>
          <h2>ORDER BY</h2>
          NAME: <input onClick={this.changeOrderBy} id="name" class="checkbox" name="orderBy" type="radio" value="name" defaultChecked />
          POPULATION: <input onClick={this.changeOrderBy} id="pop" class="checkbox" name="orderBy" type="radio" value="population" />
        </div>

        <div>
          <h2>ORDER</h2>
          ASC: <input onClick={this.changeOrder} id="asc"  class="checkbox" name="order" type="radio" value="ASC" defaultChecked />
          DESC: <input onClick={this.changeOrder} id="desc"  class="checkbox" name="order" type="radio" value="DESC" />
        </div>

        <div className="pagination">
          {this.state.page > 0 && <a><button type="button" onClick={this.previousPage}>&laquo; </button></a>}
          {this.state.page === 0 ? <a class="active">0</a> : <a>0</a>}
          {this.state.page === 1 ? <a class="active">1</a> : <a>1</a>}
          {this.state.page === 2 ? <a class="active">2</a> : <a>2</a>}
          {this.state.page === 3 ? <a class="active">3</a> : <a>3</a>}
          {this.state.page === 4 ? <a class="active">4</a> : <a>4</a>}
          {this.state.page === 5 ? <a class="active">5</a> : <a>5</a>}
          {this.state.page === 6 ? <a class="active">6</a> : <a>6</a>}
          {this.state.page < Math.floor(this.props.countries.count / 10) - 1 && <a><button type="button" onClick={this.nextPage}> &raquo; </button></a>}
        </div>

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