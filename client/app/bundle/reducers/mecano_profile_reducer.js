import {
  LOGIN_SUCCESS,
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    mecano_profile: null,
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, mecano_profile: action.user.mecano_profile}
    case MECANO_REGISTRATION_ERROR:
      const new_errors = Object.assign({}, state.errors, action.error);
      return { ...state, errors: new_errors }
    case REGISTERED_MECANO:
      return { ...state, mecano_profile: action.mecano_profile }
    default:
      return state;
  }
}
