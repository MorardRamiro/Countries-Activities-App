import { GET_COUNTRIES, GET_COUNTRY_DETAIL, GET_COUNTRIES_TO_SELECT, ADD_ACTIVITY } from "../actions/types"

const initialState = {
  countries: [],
  countryDetails: {},
  allCountries: []
  /* newActivity: {} */
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
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

      case GET_COUNTRIES_TO_SELECT:
        return {
          ...state,
          allCountries: action.payload
        };
    /* case ADD_ACTIVITY:
      return {
        ...state,
        newActivity: action.payload
      } */

    default:
      return state;
  }
}