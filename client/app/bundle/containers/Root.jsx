import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { persistStore } from 'redux-persist'
import configureStore from '../store/configureStore';
import { validateToken, keepLoggedin } from '../actions/index'
import Routes from './Routes';

const store = configureStore();


export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
    // if (typeof localStorage !== 'undefined') {
    //   if (localStorage.access_token) {
    //     store.dispatch(validateToken());
    //   }
    // }
  }
  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
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
