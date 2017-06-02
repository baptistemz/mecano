import {
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTERED_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    user: {},
    errors: {},
    isMecano : false
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user }
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, user: {} }
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.user, errors: {}, isMecano: action.user.is_mecano }
    case REGISTERED_MECANO:
      return { ...state, isMecano: true }
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
