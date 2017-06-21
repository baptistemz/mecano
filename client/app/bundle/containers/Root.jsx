import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { persistStore } from 'redux-persist';
import { validateToken } from '../actions/index';
import { Loader } from '../common/index';
import configureStore from '../store/configureStore';
import Routes from './Routes';

const store = configureStore();


export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    persistStore(store, {}, () => {
      store.dispatch(validateToken())
        .then(()=>{
          this.setState({ rehydrated: true });
        })
    })
  }
  render() {
    if(!this.state.rehydrated){
      return <div className="window-height"><Loader /></div>
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
