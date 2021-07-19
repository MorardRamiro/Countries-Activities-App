import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Countries from "./components/Countries/Countries";
import Country from "./components/Country/Country";
import Activity from "./components/Activities/Activities"
import LandingPage from "./components/Landing/Landing"

function App() {
  return (
    <React.Fragment>
      
  <NavBar />
      
      
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/main" component={Countries} />
      <Route path="/main/:id" component={Country} />
      <Route path="/form" component={Activity} />
    </React.Fragment>
  );
}

export default App;