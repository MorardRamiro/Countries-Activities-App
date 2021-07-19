import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './Navbar.css';

export default class NavBar extends Component {
  render () {
    return (
    <header className="navbar">
      <div></div>
      <nav>
        <ul className="list">
          <li className="list-item">
            <NavLink exact to="/" >Home</NavLink>
            <NavLink to="/main" > Main </NavLink>
            <NavLink to="/form" > Form </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
  }
  