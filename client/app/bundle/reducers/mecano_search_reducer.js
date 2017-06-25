import {

} from '../actions/types';

const INITIAL_STATE = {
  domains: [],
  car_make: [],
  address: "",
  radius: null,
  at_home: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_CAR_MAKES:
      return { ...state, car_makes_list: action.car_makes_list}
    case SELECTED_CAR_MAKE:
      return { ...state, selected_car_makes: [...state.selected_car_makes, action.carMake] }
    case REMOVED_CAR_MAKE:
      const new_list = state.selected_car_makes
      const index = new_list.indexOf(action.carMake);
      index !== -1 ? new_list.splice(index, 1) : new_list;
      return { ...state, selected_car_makes: new_list }
    case GOT_VEHICLES:
      return { ...state, user_vehicles: action.vehicles }
    case CREATED_VEHICLE:
      return { ...state, user_vehicles: [...state.user_vehicles, action.vehicle] }
    case DELETED_VEHICLE:
      return { ...state, user_vehicles: state.user_vehicles.filter(element => element.id !== action.vehicle.id) }
    default:
      return state;
  }
}
