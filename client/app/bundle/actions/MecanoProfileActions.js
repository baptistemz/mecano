import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import {initialize} from 'redux-form';
import { getHeadersObject, setNextHeaders } from '../utils/tokenManagement';
import {
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  UPDATED_MECANO,
  GOT_MECANO
} from './types';


// API CALLS

export function registerMecano(data, next_path){
  return dispatch => {
    return axios.post('/api/mecano_profiles', data)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(registeredMecano(response.data.mecano_profile))
        dispatch(push(next_path ? next_path : '/mecano_vehicles'))
      }).catch(error => {
        dispatch(mecanoRegistrationError(error.response.data.errors));
        const data = JSON.parse(error.response.config.data)
        dispatch(initialize("mecano_registration", {
          pro: data.pro ? "pro" : "non_pro",
          mobile: data.mobile ? "mobile" : "non_mobile",
          radius: data.radius,
          full_address: data.full_address,
          price: data.price,
          company_name: data.company_name
        }))
        setNextHeaders(error.response.headers)
      })
  };
};

export function updateMecanoProfile(id, data, next_path){
  return dispatch => {
    return axios.put(`/api/mecano_profiles/${id}`, data)
      .then(response => {
        dispatch(updatedMecano(response.data.mecano_profile))
        setNextHeaders(response.headers)
        if(next_path){dispatch(push(next_path))};
      }).catch(error => {
        dispatch(mecanoRegistrationError(error.response.data.errors));
        const data = JSON.parse(error.response.config.data)
        dispatch(initialize("mecano_edit", {
          pro: data.pro ? "pro" : "non_pro",
          mobile: data.mobile ? "mobile" : "non_mobile",
          radius: data.radius,
          full_address: data.full_address,
          price: data.price,
          company_name: data.company_name
        }))
        setNextHeaders(error.response.headers)
      })
  };
};

export function fetchMecanoProfile(id){
  return dispatch => {
    axios.defaults.headers.common = getHeadersObject(localStorage)
    axios.get(`/api/mecano_profiles/${id}`)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(gotMecanoProfile(response.data));
      }).catch(error => {
        console.log("ERROR", error)
      })
  }
};


// REDUX ACTION CREATORS

export function registeredMecano(mecano_profile) {
  return {
    type: REGISTERED_MECANO,
    mecano_profile
  };
}

export function updatedMecano(mecano_profile) {
  return {
    type: UPDATED_MECANO,
    mecano_profile
  };
}

export function gotMecanoProfile(data) {
  return {
    type: GOT_MECANO,
    data
  };
}

export function mecanoRegistrationError(errors) {
  if(errors.wall_picture){toastr.error("dimensions incorrectes")};
  if(errors){
    let errorsGroup = {};
    Object.keys(errors).forEach(function(key,index) {
      if(typeof errors[key] === 'object'){
        errors[key].map((arrayEl) => { errorsGroup[key] = arrayEl })
      }else{
        errorsGroup[key] = errors[key]
      };
    });
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: errorsGroup
    }
  }else{
    return {
      type: MECANO_REGISTRATION_ERROR,
      payload: { main: "erreur d'enregistrement" }
    }
  }
}
