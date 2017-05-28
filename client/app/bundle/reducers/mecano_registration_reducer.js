import {
  MECANO_REGISTRATION_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case MECANO_REGISTRATION_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
