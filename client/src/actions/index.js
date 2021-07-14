import { GET_COUNTRIES, GET_COUNTRY_DETAIL, ADD_ACTIVITY, GET_COUNTRIES_TO_SELECT } from "./types";

export const getCountries = (object) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries?name=${object.name}&page=${object.page}&order=${object.order}&orderBy=${object.orderBy}`)
      .then(response => response.json())
      .then(obj =>
        dispatch({ type: GET_COUNTRIES, payload: obj })
      )
  }
};

export const getCountryDetail = (id) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries/${id}`)
      .then(response => response.json())
      .then(obj =>
        dispatch({ type: GET_COUNTRY_DETAIL, payload: obj })
      )
  }
};

export const getCountriesToSelect = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries/all`)
      .then(response => response.json())
      .then(obj =>
        dispatch({ type: GET_COUNTRIES_TO_SELECT, payload: obj })
      )
  }
};

export const addActivity = (object) => {
  return(dispatch) => { 
    return fetch("http://localhost:3001/activities", {method: "post",  body: object})
    .then(response => response.json())
    .then(obj =>
      dispatch({ type: ADD_ACTIVITY, payload: obj}))
  }

};