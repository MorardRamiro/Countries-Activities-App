import { GET_COUNTRIES, GET_COUNTRY_DETAIL, ADD_ACTIVITY } from "../actions/types"

const initialState = {
  countries: [],
  countryDetails: {}
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

    default:
      return state;
  }
}