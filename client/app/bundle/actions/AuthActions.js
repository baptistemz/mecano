import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import errorHandling from '../utils/errorHandling';
import {
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  PROFILE_UPDATED
} from './types';


// API CALLS

export function validateToken(){
  return dispatch => {
    if(localStorage["reduxPersist:auth"] && JSON.parse(localStorage["reduxPersist:auth"]).isAuthenticated){
      axios.defaults.headers.common = getHeadersObject(localStorage);
      const request = axios.get('/api/auth/validate_token?unbatch=true')
      return request
        .then(response => {
          if(response.data.success){
            dispatch(receiveUser(response.data.data));
            setNextHeaders(response.headers);
          }else{
            dispatch(receiveLogout());
          }
        }).catch(error => {
          dispatch(receiveLogout())
        });
    }
  };
};

export function loginUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth/sign_in', data)
      .then(response => {
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        setNextHeaders(response.headers)
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveUser(response.data.data))
        //Send a flash message
        toastr.success('Connecté', 'Succés de la connexion');
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        console.log(error)
        dispatch(authError(error.response.data.errors));
        errorHandling(error.response);
      })
  };
}

export function signupUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        //STORE TOKEN IN LOCAL STORAGE AND IN AXIOS HEADERS FOR NEXT REQUEST
        setNextHeaders(response.headers)
        //SEND AN ACTION TO AUTH REDUCER TO REGISTER USER IN STORE
        dispatch(receiveUser(response.data.data))
        //Send a flash message
        toastr.success('Connecté', 'Succés de la connexion');
        //REDIRECT USER
        dispatch(push(next_path ? next_path.pathname : '/'));
      }).catch((error) => {
        dispatch(authError(error.response.data.errors));
        errorHandling(error.response);
      });
  };
}

export function updateProfile(data, success_message, next_path) {
  return dispatch => {
    return axios.put('/api/auth/', data)
    .then(response => {
      setNextHeaders(response.headers)
      if(success_message){
        toastr.success(success_message);
      }
      dispatch(profileUpdated(response.data.data))
      if(next_path){dispatch(push(next_path.pathname))};
    }).catch(error => {console.log("updateProfile error", error)})
  };
}

export function logoutUser() {
  return dispatch => {
    axios.delete('api/auth/sign_out')
      .then(response => {
        localStorage.clear();
        dispatch(receiveLogout());
        toastr.success('Déconnexion', 'A bientôt !');
      }).catch((error)=>{
        console.log("logoutUser error", error.response)
        localStorage.clear();
        dispatch(receiveLogout());
      })
  };
}

export function updatePassword(data) {
  return dispatch => {
    axios.put('api/auth/password', data)
      .then(response => {
        console.log(response)
        setNextHeaders(response.headers)
        $('#password_modal').modal('close')
        dispatch(reset('password_change'))
        toastr.success(response.data.message);
      }).catch((error)=>{
        setNextHeaders(response.headers)
        console.log("logoutUser error", error.response)
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

export function receiveUser(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    user
  };
}

export function profileUpdated(user) {
  return {
    type: PROFILE_UPDATED,
    user
  };
}
