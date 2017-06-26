import {
  LOGIN_SUCCESS,
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  REGISTERED_DOMAINS,
  UPDATED_MECANO,
  UPDATED_TECHNICAL_DOMAINS,
  UPDATED_CAR_DOMAINS,
  LOGOUT_SUCCESS,
  GOT_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    mecano_profile: null,
    technical_skills: [],
    car_makes: [],
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case LOGIN_SUCCESS:
      const car_makes = state.car_makes;
      const technical_skills = state.technical_skills;
      if(action.user.mecano_profile){
        action.user.mecano_profile.domains.map((domain) =>{
          if(domain.kind === 'car_make'){
            if(!car_makes.includes(domain.name)){car_makes.push(domain.name)};
          }else{
            if(!technical_skills.includes(domain.name)){technical_skills.push(domain.name)};
          }
        })
      }
      return { ...state, mecano_profile: action.user.mecano_profile, car_makes, technical_skills}
    case MECANO_REGISTRATION_ERROR:
      const new_errors = Object.assign({}, state.errors, action.error);
      return { ...state, errors: new_errors }
    case REGISTERED_MECANO:
      return { ...state, mecano_profile: action.mecano_profile }
    case UPDATED_MECANO:
      return { ...state, mecano_profile: action.mecano_profile }
    case GOT_MECANO:
      console.log("reducer", action.mecano_profile)
      return { ...state, mecano_profile: action.mecano_profile }
    case REGISTERED_DOMAINS:
      const new_car_makes = state.car_makes;
      const new_technical_skills = state.technical_skills;
      action.domains.map((domain) =>{
        if(domain.kind === 'car_make'){
          if(!new_car_makes.includes(domain.name)){new_car_makes.push(domain.name)};
        }else{
          if(!new_technical_skills.includes(domain.name)){new_technical_skills.push(domain.name)};
        }
      })
      return { ...state, technical_skills: new_technical_skills, car_makes: new_car_makes }
    case UPDATED_TECHNICAL_DOMAINS:
      const updated_technical_skills = [];
      action.domains.map((domain) =>{
        if(!updated_technical_skills.includes(domain.name)){updated_technical_skills.push(domain.name)};
      })
      return { ...state, technical_skills: updated_technical_skills }
    case UPDATED_CAR_DOMAINS:
      const updated_car_makes = [];
      action.domains.map((domain) =>{
        if(!updated_car_makes.includes(domain.name)){updated_car_makes.push(domain.name)};
      })
      return { ...state, car_makes: updated_car_makes }
    default:
      return state;
  }
}
