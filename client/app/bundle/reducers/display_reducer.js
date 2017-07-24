import {
  WHITE_NAVBAR_SET
} from '../actions/types';

const INITIAL_STATE = {
  white_navbar: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WHITE_NAVBAR_SET:
      return { ...state, white_navbar: action.white_navbar }
      break;
    default:
      return state;
  }
}
