import axios from 'axios';
import { browserHistory } from 'react-router';
import errorHandling from '../utils/errorHandling';
import {
  GOT_PROTECTED
} from './types';

export function fetchProtected() {
  return dispatch => {
    return axios.get('/api/authcheck/checkme')
      .then(response => {
        dispatch({
          type: GOT_PROTECTED,
          user: response.data
        });
      })
      .catch(err => {errorHandling(err.response)})
      // .catch(err => toastr.error('could not connect you', `${err.errors[0]}`))
  };
}
