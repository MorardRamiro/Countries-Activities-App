import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Countries from "./components/Countries/Countries";
import Country from "./components/Country/Country";
import Activity from "./components/Activities/Activities"
import LandingPage from "./components/Landing/Landing"

function App() {
  const location = useLocation();
  return (
    <React.Fragment>

      {location.pathname === '/' ? null : <NavBar />}
      
<Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Countries} />
      <Route path="/home/:id" component={Country} />
      <Route path="/form" component={Activity} />
</Switch>
    </React.Fragment>
  );
}

export default App;