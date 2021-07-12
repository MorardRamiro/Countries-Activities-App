import React from "react";
import { Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Countries from "./components/Countries/Countries";
import Country from "./components/Country/Country";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path="/" />
      <Route exact path="/main" component={Countries} />
      <Route path="/main/:id" component={Country} />
    </React.Fragment>
  );
}

export default App;