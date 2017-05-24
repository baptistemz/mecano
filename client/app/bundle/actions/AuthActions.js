import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { push } from 'react-router-redux'
import { getHeadersObject, afterLogin } from '../utils/tokenManagement';
import errorHandling from '../utils/errorHandling';
import {
  SET_CURRENT_USER,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS
} from './types';


// API CALLS

export function validateToken(){
  return dispatch => {
    axios.defaults.headers.common = getHeadersObject(localStorage);
    return axios.get('/api/auth/validate_token')
      .then(response => {
        if(response.data.success){
          dispatch(receiveLogin(response.data.data));
        }else{
          dispatch(logoutUser());
        }
      }).catch(error => {
        console.log(error);
      });
  };
};

export function loginUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth/sign_in', data)
      .then(response => {
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveLogin(response.data.data))
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        afterLogin(response.headers)
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        errorHandling(error.response)
      })
  };
}

export function signupUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveLogin(response.data.data))
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        afterLogin(response.headers)
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        errorHandling(error.response)
      });
  };
}

export function logoutUser() {
  return dispatch => {
    axios.delete('api/auth/sign_out')
      .then(response => {
        localStorage.clear();
        dispatch(receiveLogout());
        toastr.success('Déconnexion', 'A bientôt !');
      }).catch((err)=>{ errorHandling(err.response) })
  };
}


// REDUX ACTION CREATORS

function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isAuthenticated: false
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    user
  };
}
