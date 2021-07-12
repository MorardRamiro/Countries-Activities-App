/* import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
    </div>
  );
}

export default App;
 */

import React from "react"; // Importo react de las dependencias...
import { Route } from "react-router-dom"; // Importo route de las dependencias...

import Favorites from "./components/Favorites/Favorites"; // Importo todos los componentes (Favorites, Buscador, NavBar , Movie)
import Buscador from "./components/Buscador/Buscador";
import NavBar from "./components/NavBar/NavBar";
import Movie from "./components/Movie/Movie";
import Countries from "./components/Countries/Countries";
import Country from "./components/Country/Country";

function App() { // El componente global, que engloba a todos los otros componentes...
  return (
      <React.Fragment>
          <NavBar /> {/* El componente NavBar se renderiza todo el tiempo, esta fuera del route */}
          <Route exact path="/" component={Buscador} /> {/* El componente Buscador se renderizará todo el tiempo */}
          <Route path="/favs" component={Favorites} />  {/* El componente Favorites contiene una lista con todas las películas favoritas, y solo se renderizará cuando mi path sea /favs */}
          <Route path="/movie/:id" component={Movie} /> {/* El componente Movie contiene los detalles de una película en particular, y se renderizará solo cuando mi path sea /movie/:id */}
          <Route exact path="/countries" component={Countries} />
          <Route path="/countries/:id" component={Country} />
      </React.Fragment>
  );
}

export default App;