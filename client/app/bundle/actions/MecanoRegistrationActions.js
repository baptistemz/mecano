import {
  MECANO_REGISTRATION_ERROR
} from './types';


// API CALLS

export function registerMecano(){
  return dispatch => {
    return axios.post('/api/auth/validate_token')
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


// REDUX ACTION CREATORS

export function registrationError(error) {
  return {
    type: MECANO_REGISTRATION_ERROR,
    error: error
  };
}
