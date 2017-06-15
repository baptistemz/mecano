import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTERED_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    errors: {},
    id: null,
    email: '',
    first_name: '',
    last_name: '',
    profile_picture:{},
    is_mecano : false
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case LOGIN_SUCCESS:
      const {email, first_name, last_name, profile_picture, is_mecano} = action.user
      return { ...state, isAuthenticated: true, errors: {}, email, first_name, last_name, profile_picture, is_mecano }
    case REGISTERED_MECANO:
      return { ...state, is_mecano: true }
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
