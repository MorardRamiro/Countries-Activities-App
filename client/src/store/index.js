import { createStore, applyMiddleware, compose } from "redux"; // Importo el createStore y apllyMiddleware de las dependencias instaladas de redux.
import rootReducer from "../reducers/index"; // Importo el rootReducer.
import thunk from "redux-thunk"; // Importo la librería esta.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( // Creo la store que trae consigo los métodos, getState(), dispatch(action) y subscribe();
    rootReducer, // Y toma como parámetros el reducer (solo puedo tener uno por store, es decir si tengo más de uno debo agruparlos en uno solo...) y a un applyMiddleware que me permite hacer las actions asincrónicas que hacen un request al servidor
    composeEnhancers(applyMiddleware(thunk)) // ctrl+c, ctrl+v ¯\_(ツ)_/¯ Si existe algo que se llame así, lo ejecuto... PERMITE USAR LA DEVTOOL DE REDUX EN EL NAVEGADOR.
     // Es necesario configurar esto para que funcionen la actions que piden información al servidor.
    );

export default store; // Exporto la store... al index.js donde se lo voy a pasar al Provider que envuelve  a los otros componentes en el ReactDOM.render()