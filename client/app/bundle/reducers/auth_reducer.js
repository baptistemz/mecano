import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR,
  REGISTERED_MECANO,
  PROFILE_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: false,
    errors: {},
    id: null,
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: {thumb: '', medium: ''},
    is_mecano : false
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE
    case LOGIN_SUCCESS:{
      const { email, first_name, last_name, profile_picture, is_mecano, id } = action.user
      console.log("reducer isMecano", is_mecano)
      return { ...state, isAuthenticated: true, errors: {}, email, first_name, last_name, profile_picture, is_mecano, id }
    }
    case PROFILE_UPDATED:{
      const { email, first_name, last_name, profile_picture, is_mecano, id } = action.user
      return { ...state, isAuthenticated: true, errors: {}, email, first_name, last_name, profile_picture, is_mecano, id }
    }
    case REGISTERED_MECANO:
      return { ...state, is_mecano: true }
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
}
