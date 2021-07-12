import { GET_MOVIES, GET_MOVIE_DETAIL, ADD_MOVIE_FAVORITE, REMOVE_MOVIE_FAVORITE, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, GET_COUNTRY_DETAIL, ADD_ACTIVITY } from "./types";

export function addMovieFavorite(payload) { // El action creator addMovieFavorite recibe un payload como parámetro... con la película que quiero agregar a mi lista de favoritos.
  return { // Retorna una action, es decir, un objeto con una propiedad OBLIGATORIA TYPE...
      type: ADD_MOVIE_FAVORITE, payload // Y otra propiedad llamada payload que tendrá el valor introducido en el parámetro.  El payload será el key que distingue cada película, el imdbID...
    };
}
  
export function getMovies(title) { // El action creator addMovies recibe como argumento el titulo de una película.
  return function(dispatch) { // Es una thunk-function que recibe como parámetro un dispatch.
    return fetch(`http://www.omdbapi.com/?apikey=20dac387&s=${title}`) // Y pide informacióin a una API.
      .then(response => response.json()) // Luego transforma esa respuesta (la información obtenida) a un json (La transforma de una sola linea difícil de leer en un  objeto con una estructura más legible) (La convierte a un objeto de JS)
      .then(obj => { // Luego, a este arreglo de películas...
        dispatch({ type: GET_MOVIES, payload: obj }); // Despacha una acción con type GET_MOVIES y una propiedad payload con valor igual al objeto recibido de la API y json-ificado...
    });
  };
}

export function removeMovieFavorite (payload) { // El action creator removeMovieFavorite recibe un payload como argumento.
  return {
    type: REMOVE_MOVIE_FAVORITE, payload // Y retorna un action con type y payload. El payload será el key que distingue cada película, el imdbID...
  }
}

export function getMovieDetail(id) { // El action creator getMovieDetail recibe un id como parámetro (el imdbID de la película)
    return function(dispatch) { // Es una thunk-function (middleware)
        return fetch(`http://www.omdbapi.com/?apikey=20dac387&i=${id}`) // Pide el objeto con los detalles de una película a la API
          .then(response => response.json()) // Cuando lo recibe lo json-ifica.
          .then(obj => { // Luego...
            dispatch({ type: GET_MOVIE_DETAIL, payload: obj }); // Despacha un action con type GET_MOVIE_DETAIL y un payload igual al objeto json-ificado de la API.
        });
      };
    }

export const getCountries = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries`)
    .then(response => response.json())
    .then(obj => 
      dispatch({ type: GET_COUNTRIES, payload: obj})
      )
  }
};

export const getCountriesByName = (name) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries?name=${name}`)
    .then(response => response.json())
    .then(obj => 
      dispatch({ type: GET_COUNTRIES, payload: obj})
      )
  }
};

export const getCountryDetail = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries/${id}`)
    .then(response => response.json())
    .then(obj => 
      dispatch({ type: GET_COUNTRY_DETAIL, payload: obj})
      )
  }
};

export const addActivity = () => {

};

/* import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";

export function getCountries() {
    return (dispatch) => {
        axios.get("http://localhost:3001/countries").then(res => {
            dispatch({type: GET_COUNTRIES, payload: res.data})
        })
    }
} */