import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../bundle/reducers';
import chaiJquery from 'chai-jquery';
import { IntlProvider } from 'react-intl';
import { defaultLocale } from '../libs/i18n/default';

const history = createHistory();

//set up environment to run like a browser in the command line
const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
const win = doc.window;

global.document = win.document;
global.window = win;
const $ = jquery(global.window)
global.$ = $

// build renderComponent helper that should render a given react class
function renderComponent(ComponentClass, props, state){
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <IntlProvider>
        <ConnectedRouter history={history}>
          <ComponentClass { ...props }/>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  );
  return $(ReactDOM.findDOMNode(componentInstance));
}

// build helper for simulating events
$.fn.simulate = function(eventName, value){
  if(value){
    this.val(value)
  }
  TestUtils.Simulate[eventName](this[0]);
}

// set up chai-jquery
chaiJquery(chai, chai.util, $);


export { expect, renderComponent }
