import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './Landing.css';

export default class LandingPage extends Component {
  render() {
    return(
    <div className="map elp">
      <div className="btn whitebackground">
        <NavLink exact to="/home" ><h1 className="inside">Home</h1></NavLink>
        </div>

      
    </div>
  )} 
}