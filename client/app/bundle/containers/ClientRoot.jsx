import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { translations } from '../../libs/i18n/translations';
import { defaultLocale } from '../../libs/i18n/default';
import ReduxToastr from 'react-redux-toastr';
import { persistStore } from 'redux-persist';
import { validateToken } from '../actions/index';
import { Loader } from '../common/index';
import configureStore from '../store/clientConfigureStore';
import ClientRoutes from './ClientRoutes';

const locale = defaultLocale;
const messages = translations[locale];

class RootWithoutRailsContext extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    //SAVE STORE IN LOCALSTORAGE SO THAT ON PAGE REFRESH FRONTEND DATA IS STILL ALIVE
    const { store } = this.props;
    persistStore(store, {blacklist: ['display']}, () => {
      store.dispatch(validateToken())
      this.setState({ rehydrated: true });
    })
  }
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages}>
          <div>
            <ClientRoutes rehydrated={ this.state.rehydrated } />
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

const ClientRoot = (props, railsContext) => {
  const store = configureStore(props);
  return(
    <RootWithoutRailsContext {...{...props, railsContext, store}}/>
  )
}

export default ClientRoot;
