import {
  LOGOUT_SUCCESS,
  ADD_DOMAINS_TO_SEARCH,
  IMPLEMENT_SEARCH,
  RECEIVED_SEARCH_RESULTS,
  UPDATE_DISTANCE,
  CREATED_VEHICLE,
  SEARCH_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  domains: [],
  vehicle:{},
  car_make: [],
  full_address: "",
  distance: null,
  results: [],
  errors:{}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IMPLEMENT_SEARCH:
      const { vehicle, full_address, distance} = action.values;
      return { ...state, vehicle: vehicle, full_address: full_address, car_make: vehicle.brand, distance: parseInt(distance), errors:{} }
    case ADD_DOMAINS_TO_SEARCH:
      return { ...state, domains: action.domains, errors:{}}
    case UPDATE_DISTANCE:
      return { ...state, distance: parseInt(action.distance), errors:{}}
    case CREATED_VEHICLE:
      return { ...state, vehicle: action.vehicle, errors:{}}
    case RECEIVED_SEARCH_RESULTS:
      return { ...state, results: action.search_results, errors:{}}
    case SEARCH_ERROR:
      return { ...state, errors: action.errors}
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
      break;
    default:
      return state;
  }
}
