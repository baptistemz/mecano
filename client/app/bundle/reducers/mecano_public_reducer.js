import {
  GOT_MECANO
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    display_name: "",
    pro: null,
    price: null,
    city: "",
    country: "",
    mobile: null,
    all_vehicles: null,
    rating: null,
    contacted: false,
    picture: {},
    technical_skills: [],
    car_makes: [],
    errors: {}
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_MECANO:{
      const { mecano_profile, car_makes, domains } = action.data;
      const {id, display_name, pro, price, city, country, mobile, all_vehicles, rating, picture, contacted} = mecano_profile;
      return { ...state, id, car_makes, technical_skills: domains, display_name, pro, price, city, country, mobile, all_vehicles, rating, picture, contacted }
    }
    default:
      return state;
  }
}
