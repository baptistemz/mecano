import {
  GOT_CAR_MAKES,
  GOT_CAR_MODELS
} from '../actions/types';

const INITIAL_STATE = {
    car_makes_list: [],
    car_models_list: []
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_CAR_MAKES:
      return { ...state, car_makes_list: action.car_makes_list}
    case GOT_CAR_MODELS:
      return { ...state, car_models_list: action.car_models_list }
    default:
      return state;
  }
}
