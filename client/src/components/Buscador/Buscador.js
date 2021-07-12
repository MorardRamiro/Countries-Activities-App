import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './Buscador.css'; // importo los estilos.

import { addMovieFavorite, getMovies } from "../../actions/index.js" // Importo los action creators que voy a usar en el mapDispatchToProps...

export class Buscador extends Component { // La clase Buscador extiende el componente de react.
  constructor(props) {
    super(props);
    this.state = { // El estado local del componente es un objeto con una propiedad title con valor igual a un string vacío.
      title: "" // Cada vez que haya un cambio en el input espero que se vayan guardando aquí... en el estado local...
    };
    this.handleChange = this.handleChange.bind(this); // Bind-eo this para los dos métodos de la clase.
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) { // El método handleChange recibe como parámetro un evento e... 
    this.setState({ title: e.target.value }); // y setea el estado local con el valor del target del evento (A medida que voy escribiendo el nombre de una película en el input del buscador quiero que se me vaya guardando en el estado local del componente)
  }
  handleSubmit(e) { // El método handleSubmit recibe el evento e como parámetro...
    e.preventDefault(); // Evito que el evento me recargue la página, ya que de lo contratio, al ser un formulario manda el refresh de la página por default
    this.props.getMovies(this.state.title) // Dispatcheo la action getMovies con el titulo que escribí en el buscador (y que se fue guardando en el estado local) como argumento.
  } // OJO AL PIOJO!!! Debo invocar la que pase como prop!

  render() {
    const { title } = this.state;
    return ( 
      <div> {/* Retorno este div, que contiene todo lo otro */}
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={this.handleSubmit}> {/* Al submit-ear aplico el método onSubmit (el evento e es el submit) */}
          <div> {/* onSubmit=(e)=> this.handleSubmit(e) // -> De esta forma no necesitaria bindear el THIS, la arrow function bindea al momento de la creación, digamos... */}
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={this.handleChange} // Al cambiar el texto introducido en el input, aplico el  método handleChange que ctualiza el estado local...
            />
          </div>
          <button type="submit" onClick={this.props.getMovies}>BUSCAR</button>
        </form>
        <ul>
         {this.props.movies && this.props.movies.map((e) => { // Si existen las movies, es decir el array moviesLoaded no esta vacío,  mapealo en forma de lista (con link, key y un botón para gregarlas a favoritos...)... y retornalo (recordar que Logical && devuelve el de la derecha)
           return (
           <li key={e.imdbID}> {/* un list item con un key igual al imdbID de la película */}
           <Link to={`/movie/${e.imdbID}`}> {/* Al clickear el titulo, me lleva a el path donde se renderiza el detalle la pelicula. */}
           {e.Title}
         </Link> 
         <button onClick={() => this.props.addMovieFavorite(e)}>Fav</button> {/* Clickear el botón Fav despacha la action addMovieFacorite */}
         </li> /* Paso la definición de una función con parámetro, no la invocación. Es decir, como quiero pasar la función this.props.addMovieFavorite, pero como recibe un parámetro, this.props.addMovieFavorite(movie) es la invocación de la función, por eso, lo envuelvo en una arrow function  */
         )})/* Aqui tienes que escribir tu codigo para mostrar la lista de peliculas */}
        </ul>
      </div>
    );
  }
}

/* export default Buscador; */

function mapStateToProps(state) { // mapStateToProps mapea la parte del estado global que necesito utilizar en este componenete  a props. Recibe como argumento el estado.
  return { // Retorna un objeto con el nombre de las props...que hace referencia a esa parte del estado... <Component count={store.getState().count} />
    movies: state.moviesLoaded // Debo poder acceder al array moviesLoaded del state global para poder renderizar en pantalla la lista con la películas
  };
}

function mapDispatchToProps(dispatch) { // mapDispatchToProps hace un mapeo entre los action creators y dispatchs que quiero utilizar en este componente a props.
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)), // addMovieFavorite: (movie) => store.dispatch ({type: "ADD_MOVIE_FAVORITE", payload: title})
    getMovies: title => dispatch(getMovies(title))  // getMovies: (title) => store.dispatch ({type: "GET_MOVIE", payload: obj})
  };
}

/* export default connect( 
  mapStateToProps,
  {addMovieFavorite, getMovies}         // -> OTRA FORMA DE HACERLO SIN EL MAP_DISPATCH_TO_PROPS
)(Buscador); */



export default connect( // Exporto un compoenente con todas estas propiedades conectadas...
  mapStateToProps,
  mapDispatchToProps
)(Buscador); // Lo casteo con el componente como argumento...
