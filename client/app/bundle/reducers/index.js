import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import MecanoProfileReducer from './mecano_profile_reducer';
import MecanoPublicReducer from './mecano_public_reducer';
import VehicleReducer from './vehicle_reducer';
import DisplayReducer from './display_reducer';
import MecanoSearchReducer from './mecano_search_reducer';
import ReviewReducer from './review_reducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  auth: AuthReducer,
  mecano: MecanoProfileReducer,
  mecano_visited: MecanoPublicReducer,
  form: formReducer,
  vehicle: VehicleReducer,
  toastr: toastrReducer,
  router: routerReducer,
  search: MecanoSearchReducer,
  review: ReviewReducer,
  display: DisplayReducer,
});

export default rootReducer;
