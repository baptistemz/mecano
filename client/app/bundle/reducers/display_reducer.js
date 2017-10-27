import {
  WHITE_NAVBAR_SET
} from '../actions/types';

const INITIAL_STATE = {
  white_navbar: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WHITE_NAVBAR_SET:
      console.log("reducer", action.white_navbar)
      return { ...state, white_navbar: action.white_navbar }
      break;
    default:
      return state;
  }
}
