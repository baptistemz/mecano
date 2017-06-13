import axios from 'axios';
import {
  GOT_CAR_MAKES,
  GOT_CAR_MODELS,
  SELECTED_CAR_MAKE,
  REMOVED_CAR_MAKE
} from './types';


// EXTERNAL API CALLS

export function fetchCarMakes(){
  return dispatch => {
    $.getJSON('https://www.carqueryapi.com/api/0.3/?callback=?', {cmd:"getMakes"}, function(data){
      if(!data.error){
        dispatch(gotCarMakes(data));
      }else{
        console.log("error", data.error);
      }
    });
  }
};
export function fetchCarModels(carMake){
  return dispatch => {
    return axios.get(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${carMake}`)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log("error", error.response)
      })
  };
};



// REDUX ACTION CREATORS

export function gotCarMakes(data) {
  return {
    type: GOT_CAR_MAKES,
    car_makes_list: data.Makes.map(function(i){return i['make_id']})
  }
}

export function gotCarModels(data) {
  return {
    type: GOT_CAR_MODELS,
    mecano_profile
  };
}

export function selectCarMake(carMake){
  return {
    type: SELECTED_CAR_MAKE,
    carMake
  };
};
export function removeCarMake(carMake){
  return {
    type: REMOVED_CAR_MAKE,
    carMake
  };
};
