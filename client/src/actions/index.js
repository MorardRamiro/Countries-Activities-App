import { GET_COUNTRIES, GET_COUNTRY_DETAIL, ADD_ACTIVITY } from "./types";

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

export const addActivity = () => {

};