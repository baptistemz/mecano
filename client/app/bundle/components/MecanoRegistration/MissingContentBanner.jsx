import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from './index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

let MissingContentBanner = (props) => {
  const { formatMessage } = props.intl;
  return (
    <div className="missing-content-banner justify-center align-center">
      <i className="material-icons">error</i>
      <p>
        {formatMessage(defaultMessages.mecanoMissingContentBannerMessage)}
      </p>
    </div>
  );
};

MissingContentBanner = injectIntl(MissingContentBanner);

export { MissingContentBanner };
