import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { translations } from '../../libs/i18n/translations';
import { defaultLocale } from '../../libs/i18n/default';
import { persistStore } from 'redux-persist';
import { validateToken } from '../actions/index';
import { Loader } from '../common/index';
import configureStore from '../store/serverConfigureStore';
import ServerRoutes from './ServerRoutes';

const store = configureStore();
const locale = defaultLocale;
const messages = translations[locale];

export default class ServerRoot extends Component {
  constructor() {
    console.log("SERVER")
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    //SAVE STORE IN LOCALSTORAGE SO THAT ON PAGE REFRESH FRONTEND DATA IS STILL ALIVE
    persistStore(store, {}, () => {
      store.dispatch(validateToken())
      this.setState({ rehydrated: true });
    })
  }
  render() {
    if(!this.state.rehydrated){
      return <div className="window-height"><Loader /></div>
    }
    return (
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <div>
            <ServerRoutes />
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}
