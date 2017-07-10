import {
  GOT_CAR_MAKES,
  SELECTED_CAR_MAKE,
  REMOVED_CAR_MAKE,
  GOT_VEHICLES,
  CREATED_VEHICLE,
  DELETED_VEHICLE,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  VEHICLE_FORM_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    car_makes_list: [],
    selected_car_makes: [],
    user_vehicles: [],
    vehicle_form: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case GOT_CAR_MAKES:
      return { ...state, car_makes_list: action.car_makes_list}
    case SELECTED_CAR_MAKE:
      return { ...state, selected_car_makes: [...state.selected_car_makes, action.carMake] }
    case REMOVED_CAR_MAKE:
      const new_list = state.selected_car_makes
      const index = new_list.indexOf(action.carMake);
      index !== -1 ? new_list.splice(index, 1) : new_list;
      return { ...state, selected_car_makes: new_list }
    case LOGIN_SUCCESS:
      return { ...state, user_vehicles: action.user.vehicles }
    case CREATED_VEHICLE:
      return { ...state, user_vehicles: [...state.user_vehicles, action.vehicle] }
    case DELETED_VEHICLE:
      return { ...state, user_vehicles: state.user_vehicles.filter(element => element.id !== action.vehicle.id) }
    default:
      return state;
  }
}
