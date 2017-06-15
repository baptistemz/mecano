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




// REDUX ACTION CREATORS

export function gotCarMakes(data) {
  const car_makes_list = {}
  data.Makes.map(function(i){car_makes_list[i['make_id']] = null})
  return {
    type: GOT_CAR_MAKES,
    car_makes_list
  }
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
