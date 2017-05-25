import _ from 'lodash';
import {
  SET_CURRENT_USER,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_ERROR
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
      return {
        user: action.user
      }
    case LOGOUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: {}
      }
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.user,
        errors: {}
      }
    case AUTH_ERROR:
      return {
        errors: action.payload
      }
    // case LOGIN_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false,
    //     user: action.creds.email
    //   });
    // case LOGIN_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     isAuthenticated: true,
    //     username: action.user.user.username,
    //     email: action.user.user.email,
    //     id: action.user.user.id,
    //     errorMessage: ''
    //   });
    // case LOGIN_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     isAuthenticated: false,
    //     errorMessage: action.message
    //   });
    // case SIGNUP_REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false,
    //     user: action.creds.email
    //   });
    // case SIGNUP_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     isAuthenticated: true,
    //     errorMessage: '',
    //     username: action.user.user.username,
    //     email: action.user.user.email,
    //     id: action.user.user.id
    //   });
    // case SIGNUP_FAILURE:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     isAuthenticated: false,
    //     errorMessage: action.message
    //   });
    // case LOGOUT_SUCCESS:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isAuthenticated: false
    //   });
    default:
      return state;
  }
}
