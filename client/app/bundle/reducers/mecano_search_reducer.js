import {
  LOGOUT_SUCCESS,
  ADD_DOMAINS_TO_SEARCH,
  IMPLEMENT_SEARCH,
  RECEIVED_SEARCH_RESULTS,
  UPDATE_DISTANCE
} from '../actions/types';

const INITIAL_STATE = {
  domains: [],
  vehicle:{},
  car_make: [],
  full_address: "",
  distance: null,
  results: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IMPLEMENT_SEARCH:
      const { vehicle, full_address, distance} = action.values;
      return { ...state, vehicle: vehicle, full_address: full_address, car_make: vehicle.brand, distance: parseInt(distance) }
    case ADD_DOMAINS_TO_SEARCH:
      return { ...state, domains: action.domains}
    case UPDATE_DISTANCE:
      return { ...state, distance: parseInt(action.distance)}
    case RECEIVED_SEARCH_RESULTS:
      return { ...state, results: action.search_results}
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
      break;
    default:
      return state;
  }
}
