import {
  GOT_CAR_MAKES,
  GOT_CAR_MODELS,
  SELECTED_CAR_MAKE,
  REMOVED_CAR_MAKE
} from '../actions/types';

const INITIAL_STATE = {
    car_makes_list: [],
    selected_car_makes: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_CAR_MAKES:
      return { ...state, car_makes_list: action.car_makes_list}
    // case GOT_CAR_MODELS:
    //   return { ...state, car_models_list: action.car_models_list }
    case SELECTED_CAR_MAKE:
      return { ...state, selected_car_makes: [...state.selected_car_makes, action.carMake] }
    case REMOVED_CAR_MAKE:
      var index = state.selected_car_makes.indexOf(action.carMake);
      if (index !== -1) {
        const new_car_makes_list = state.selected_car_makes.splice(index, 1)
      }
      return { ...state, selected_car_makes: new_car_makes_list }
    default:
      return state;
  }
}
