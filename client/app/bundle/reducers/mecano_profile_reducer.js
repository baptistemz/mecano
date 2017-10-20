import {
  LOGIN_SUCCESS,
  MECANO_REGISTRATION_ERROR,
  REGISTERED_MECANO,
  REGISTERED_DOMAINS,
  UPDATED_MECANO,
  UPDATED_TECHNICAL_DOMAINS,
  UPDATED_CAR_DOMAINS,
  LOGOUT_SUCCESS,
  AUTOCOMPLETE_ADDRESS,
  // GOT_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    display_name: "",
    pro: null,
    price: null,
    city: "",
    country: "",
    radius: null,
    mobile: null,
    all_vehicles: null,
    rating: null,
    rates_number: null,
    company_name: "",
    full_address: "",
    description: "",
    technical_skills: [],
    car_makes: [],
    reviews:[],
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case MECANO_REGISTRATION_ERROR:
      const errors = action.payload
      console.log("receive error in reducer", errors)
      return { ...state, errors }
    case LOGIN_SUCCESS:{
      if(action.user.mecano_profile){
        const { id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, rates_number, full_address, company_name, description, reviews, car_makes, technical_skills } = action.user.mecano_profile;
        return { ...state, id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, rates_number, full_address, company_name, description, reviews, car_makes, technical_skills, errors:{} }
      }else{
        return state
      }
    }
    case REGISTERED_MECANO:{
      const { id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, full_address, company_name, description } = action.mecano_profile;
      return { ...state, id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, full_address, company_name, description, errors:{} }
    }
    case UPDATED_MECANO:{
      const { id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, full_address, company_name, description } = action.mecano_profile;
      console.log("REDUCER", action.mecano_profile)
      return { ...state, id, display_name, pro, price, city, country, mobile, all_vehicles, radius, rating, full_address, company_name, description, errors: {} }
    }
    case REGISTERED_DOMAINS:
      const new_car_makes = state.car_makes;
      const new_technical_skills = state.technical_skills;
      action.domains.map((domain) =>{
        if(domain.kind === 'car_make'){
          if(!new_car_makes.includes(domain.value)){new_car_makes.push(domain.value)};
        }else{
          if(!new_technical_skills.includes(domain.value)){new_technical_skills.push(domain.value)};
        }
      })
      return { ...state, technical_skills: new_technical_skills, car_makes: new_car_makes, errors: {} }
    case UPDATED_TECHNICAL_DOMAINS:
      const updated_technical_skills = [];
      action.domains.map((domain) =>{
        if(!updated_technical_skills.includes(domain)){updated_technical_skills.push(domain)};
      })
      return { ...state, technical_skills: updated_technical_skills, errors: {} }
    case UPDATED_CAR_DOMAINS:
      const updated_car_makes = [];
      action.domains.map((domain) =>{
        if(!updated_car_makes.includes(domain)){updated_car_makes.push(domain)};
      })
      return { ...state, car_makes: updated_car_makes, errors: {} }
    case AUTOCOMPLETE_ADDRESS:
      return { ...state, full_address: action.address }
    default:
      return state;
  }
}
