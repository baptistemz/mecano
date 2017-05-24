import axios from 'axios';
import { push } from 'react-router-redux'
import { setStorage, getHeadersObject } from '../utils/tokenManagement';
import errorHandling from '../utils/errorHandling';
import {
  SET_CURRENT_USER,
  LOGOUT_SUCCESS
} from './types';

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function setCurrenUser(user){
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function validateToken(){
  return dispatch => {
    axios.defaults.headers.common = getHeadersObject(localStorage);
    return axios.get('/api/auth/validate_token')
      .then(response => {
        dispatch(setCurrenUser(response.data.data));
      }).catch(error => {
        console.log(error);
      });
  };
};

export function loginUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth/sign_in', data)
      .then(response => {
        const headers = response.headers
        headers['access_token'] = headers['access-token']
        console.log("HEADERS", getHeadersObject(headers))
        setStorage(getHeadersObject(headers));
        axios.defaults.headers.common = getHeadersObject(headers);
        dispatch(setCurrenUser(response.data.data));
        dispatch(push(next_path));
      }).catch((error) => {
        console.log(error)
        errorHandling(error.response);
      })
  };
}

export function signupUser(data, next_path) {
  return dispatch => {
    return axios.post('/api/auth', data)
      .then(response => {
        const headers = response.headers
        headers['access_token'] = headers['access-token']
        setStorage(getHeadersObject(headers));
        axios.defaults.headers.common = getHeadersObject(headers);
        dispatch(setCurrenUser(response.data.data));
        dispatch(push(next_path));
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
        browserHistory.push('/');
      })
      .catch((err)=>{ errorHandling(err.response) })
  };
}
