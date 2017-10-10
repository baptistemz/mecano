import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {autoRehydrate, persistStore} from 'redux-persist'
import thunk from 'redux-thunk';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(
    reducers,
    autoRehydrate()
  );
}
