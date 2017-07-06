import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { translations } from '../../libs/i18n/translations';
import { defaultLocale } from '../../libs/i18n/default';
import ReduxToastr from 'react-redux-toastr';
import { persistStore } from 'redux-persist';
import { validateToken } from '../actions/index';
import { Loader } from '../common/index';
import configureStore from '../store/configureStore';
import Routes from './Routes';

const store = configureStore();
const locale = defaultLocale;
const messages = translations[locale];

export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
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
            <Routes />
            <ReduxToastr
              timeOut={4000}
              preventDuplicates
              position="bottom-right"
              />
          </div>
        </IntlProvider>
      </Provider>
    );
  }
}
