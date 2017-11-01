import {
  WHITE_NAVBAR_SET
} from '../actions/types';

const INITIAL_STATE = {
  white_navbar: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case WHITE_NAVBAR_SET:
      return { ...state, white_navbar: action.white_navbar }
    default:
      return state;
  }
}
