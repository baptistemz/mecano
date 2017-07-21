import {
  GOT_MECANO,
  RECOMMENDED_DOMAIN,
  UNRECOMMENDED_DOMAIN,
  GOT_RECOMMENDATION_PICTURES,
  REVIEW_POSTED,
  GOT_REVIEWS
} from '../actions/types';

const INITIAL_STATE = {
    id: null,
    display_name: "",
    pro: null,
    price: null,
    city: "",
    country: "",
    description: "",
    mobile: null,
    all_vehicles: null,
    rating: null,
    contacted: false,
    picture: {},
    technical_skills: [],
    car_makes: [],
    errors: {},
    rates_number: 0,
    recommendation_pictures: [],
    reviews: [],
  };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GOT_MECANO:{
      const { mecano_profile, car_makes, domains, reviews } = action.data;
      const {id, display_name, pro, price, city, country, mobile, all_vehicles, rating, rates_number, description, picture, contacted} = mecano_profile;
      return { ...state, id, reviews, car_makes, technical_skills: domains, display_name, pro, price, city, country, mobile, all_vehicles, rating, rates_number, description, picture, contacted }
    }
    case RECOMMENDED_DOMAIN:{
      const car_makes = state.car_makes.map((make) => {
        if(make['id'] === action.recommendation.domain_id){
          make['recommended'] = true
          make['recommendation_number'] += 1;
        }
        return make
      })
      const technical_skills = state.technical_skills.map((skill) => {
        if(skill['id'] == action.recommendation.domain_id){
          skill['recommended'] = true;
          skill['recommendation_number'] += 1;
        }
        return skill
      })
      return { ...state, car_makes, technical_skills }
    }
    case UNRECOMMENDED_DOMAIN:{
      const car_makes = state.car_makes.map((make) => {
        if(make['id'] === action.recommendation.domain_id){
          make['recommended'] = false
          make['recommendation_number'] -= 1;
        }
        return make
      })
      const technical_skills = state.technical_skills.map((skill) => {
        if(skill['id'] == action.recommendation.domain_id){
          skill['recommended'] = false;
          skill['recommendation_number'] -= 1;
        }
        return skill
      })
      return { ...state, car_makes, technical_skills }
    }
    case GOT_RECOMMENDATION_PICTURES:
      return { ...state, recommendation_pictures: action.pictures }
    case REVIEW_POSTED:
      return { ...state, contacted: false, rating: action.data.mecano_profile.rating, rates_number: action.data.mecano_profile.rates_number }
    case GOT_REVIEWS:
      return { ...state, reviews: action.reviews }
    default:
      return state;
  }
}
