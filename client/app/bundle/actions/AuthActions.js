import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { push } from 'react-router-redux'
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import errorHandling from '../utils/errorHandling';
import {
  SET_CURRENT_USER,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  PROFILE_UPDATED
} from './types';




// API CALLS

export function validateToken(){
  return dispatch => {
    axios.defaults.headers.common = getHeadersObject(localStorage);
    console.log("headers", axios.defaults.headers.common.auth_token)
    const request = axios.get('/api/auth/validate_token?unbatch=true')
    return request
      .then(response => {
        console.log("response", response)
        if(response.data.success){
          dispatch(receiveLogin(response.data.data));
          setNextHeaders(response.headers);
        }else{
          dispatch(logoutUser());
        }
      }).catch(error => {
        console.log("ERROR", error.response);
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
        setNextHeaders(response.headers)
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        console.log(error);
        dispatch(authError(error.response.data.errors));
        errorHandling(error.response);
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
        setNextHeaders(response.headers)
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        console.log(error);
        dispatch(authError(error.response.data.errors));
        errorHandling(error.response);
      });
  };
}

export function updateProfile(data) {
  return dispatch => {
    return axios.put('/api/auth/', data)
    .then(response => {
      console.log(response)
      setNextHeaders(response.headers)
      dispatch(validateToken())
    })
    .catch(err => {console.log(err.response)})
    // .catch(err => toastr.error('could not connect you', `${err.errors[0]}`))
  };
}

export function getUserData(){
  return dispatch => {
    axios.get('api/authcheck/checkme')
      .then(response => {
        dispatch(receiveLogin(response.data.data))
        setNextHeaders(response.headers)
      }).catch(error => {
        console.log( error.response)
      })
  }
}

export function logoutUser() {
  return dispatch => {
    axios.delete('api/auth/sign_out')
      .then(response => {
        localStorage.clear();
        dispatch(receiveLogout());
        toastr.success('Déconnexion', 'A bientôt !');
      }).catch((error)=>{
        console.log(error.response);
        localStorage.clear();
        dispatch(receiveLogout());
      })
  };
}


// REDUX ACTION CREATORS

function authError(errors){
  if (errors.length === 1){
    return {
      type: AUTH_ERROR,
      payload: { main: errors[0] }
    }
  }else{
    const errorGroup = {};
    Object.keys(errors).forEach(function(key,index) {
      errorGroup[key] = errors[key];
    });
    return {
      type: AUTH_ERROR,
      payload: errorGroup
    }
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
