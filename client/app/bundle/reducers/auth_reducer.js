import {
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  KEEP_LOGGEDIN
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    user: {},
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user }
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, user: {} }
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.user, errors: {} }
    case KEEP_LOGGEDIN:
      return { ...state, isAuthenticated: true }
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
