import { GET_MOVIES, GET_MOVIE_DETAIL, ADD_MOVIE_FAVORITE, REMOVE_MOVIE_FAVORITE, GET_COUNTRIES, GET_COUNTRY_DETAIL, ADD_ACTIVITY } from "../actions/types"

const initialState = { // El state inicial que recibira el reducer...
    moviesFavourites: [], // moviesFavourites es un array donde se guardarán las películas favoritas...
    moviesLoaded: [], // moviesLoaded es un arreglo donde se guardarán las peliculas cargadas, recibidas de el request a la API...
    movieDetail: {}, // movieDetail es un objeto con todas los detalles de una película determinada con un único id...
    countries: [],
    countryDetails: {}
};

export default function rootReducer(state = initialState, action) { // El reducer es una función pura que recibe un state y una action...
    switch(action.type) { // Dependiendo del tipo de acción que le pase, switcheo...
        case ADD_MOVIE_FAVORITE: // En el caso de que el action.type sea ADD_MOVIE_FAVORITE;
            return { // Retorna un nuevo objeto state que,
          ...state, // Toma el estado anterior y le aplica el spread operator,
          moviesFavourites: state.moviesFavourites.concat(action.payload) // Y le concatena la nueva película favorita (que trajo la action en su payload) al array moviesFavorites que contiene todas la películas favoritas.
        };
              
        case GET_MOVIES: // En el caso de que el action.type sea GET_MOVIES...
            return { // Retorna un nuevo objeto state,
          ...state, // Spread-ea el viejo state...
          moviesLoaded: action.payload.Search // Y sobreescribe el viejo array moviesLoaded con el nuevo array obtenido del request a la API que traía la action en el payload.
        };

        case GET_MOVIE_DETAIL: // En el caso que el action.type sea GET_MOVIE_DETAIL...
            return { // Retorna un objeto con el estado anterior...
                ...state,
                movieDetail: action.payload // y el movieDetail sobreescrito con el payload de la action (un objeto con todos los detalles de un película en particular)
            };
        
        case REMOVE_MOVIE_FAVORITE: // En caso de que el action.type sea REMOVE_MOVIE_FAVORITE.
            return { // Retorna un objeto con el estado a nterior...
                ...state,
                moviesFavourites: state.moviesFavourites.filter((e) => e.imdbID !== action.payload) // y sobreescribe el array de moviesFavourites con otro donde la película que quiero eliminar (que traje en el action.payload) fue filtrada. Payload es el imbdID de la película a eliminar de la lista de favoritos...
            };

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
            
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetails: action.payload
            };
        
        default: // Si no le paso ninguno de los casos anteriores...
            return state; // Retorna el state anterior (el introducido como parámetro).
    }
  }

  // Lo exporto al store
  
  /* import { GET_COUNTRIES } from "../src/actions"

const initialState = {
    countries = []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };
        default: return state;
    }
}; */