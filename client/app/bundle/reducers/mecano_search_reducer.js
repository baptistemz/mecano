import {
  LOGOUT_SUCCESS
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
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
      break;
    default:
      return state;
  }
}
