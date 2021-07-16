import { GET_COUNTRIES, GET_COUNTRY_DETAIL, ADD_ACTIVITY, GET_COUNTRIES_TO_SELECT, GET_ALL_ACTIVITIES } from "./types";

export const getCountries = (object) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/countries?name=${object.name}&page=${object.page}&order=${object.order}&orderBy=${object.orderBy}&continent=${object.continent}&activity=${object.activity}`)
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
    return fetch("http://localhost:3001/activities", {method: "POST", headers: {'Content-Type': 'application/JSON'}, body: JSON.stringify(object)})
    .then(response => response.json())
    .then(obj =>
      dispatch({ type: ADD_ACTIVITY, payload: obj}))
  }

};

export const getAllActivities = () => {
  return(dispatch) => {
    return fetch("http://localhost:3001/activities")
    .then(response => response.json())
    .then(obj => 
      dispatch({type: GET_ALL_ACTIVITIES, payload: obj}))
  }
};