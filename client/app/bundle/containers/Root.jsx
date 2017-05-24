import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import configureStore from '../store/configureStore';
import { validateToken } from '../actions/index'
import Routes from './Routes';

const store = configureStore();
if (typeof localStorage !== 'undefined') {
  if (localStorage.access_token) {
    store.dispatch(validateToken());
  }
}

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Routes />
          <ReduxToastr
            timeOut={4000}
            preventDuplicates
            position="bottom-right"
            />
        </div>
      </Provider>
    );
  }
}
