import { toastr } from 'react-redux-toastr';
import axios from 'axios';
import { push } from 'react-router-redux';
import { setNextHeaders } from '../utils/tokenManagement';
import {
  MARK_CHANGED,
  REVIEW_POSTED,
  GOT_REVIEWS
} from './types';


// EXTERNAL API CALLS
export function postReview(mecano_id, values){
  return dispatch => {
    return axios.post(`/api/mecano_profiles/${mecano_id}/reviews`, values)
      .then(response => {
        setNextHeaders(response.headers)
        dispatch(reviewPosted(response.data))
        toastr.success("Merci ! Votre retour a bien été enregistré");
        dispatch(push(`/mecanos/${mecano_id}`))
        toastr.success("Recommendez ce mécano en cliquant sur le '+1' à côté des domaines et marques de voitures concernés.", {timeOut: 10000});
      }).catch(error => {
        console.log(error.response)
        // setNextHeaders(error.response.headers)
      })
  };
}

export function loadReviews(id, batch_size){
  return dispatch => {
    return axios.get(`/api/mecano_profiles/${id}/reviews`, { params: { batch_size: batch_size }})
      .then(response => {
        dispatch(gotReviews(response.data))
      }).catch(error => {
        console.log("ERROR", error.response)
      })
  }
};

//ACTION CREATORS

export function changeMark(mark){
  return {
    type: MARK_CHANGED,
    mark
  }
}
export function reviewPosted(data){
  return {
    type: REVIEW_POSTED,
    data
  }
}
export function gotReviews(reviews){
  return {
    type: GOT_REVIEWS,
    reviews
  }
}
