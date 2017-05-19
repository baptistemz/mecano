import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from '../store/configureStore';
import SideNav from '../components/SideNav';
import Routes from './Routes';

const store = configureStore();

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
