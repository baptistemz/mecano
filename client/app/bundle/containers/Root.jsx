import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../store/configureStore';
import SideNav from '../components/SideNav';
import { setCurrenUser } from '../actions/index'
import Routes from './Routes';

const store = configureStore();

if (localStorage.access_token) {
  const { email, first_name, last_name, image } = localStorage
  console.log(email)
  store.dispatch(setCurrenUser())
}

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} routes={Routes} />
        </div>
      </Provider>
    );
  }
}
