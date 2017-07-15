import React from 'react';
import { Header } from '../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

const Home = (props) => {
  const { formatMessage } = props.intl
  return (
    <div>
      <Header h2={true}>Restor'it</Header>
        <div className="container">
          <h1 id="name-of-the-app">Restor'it</h1>
        </div>
    </div>
  );
};

export default injectIntl(Home);
