import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from './index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

let ContactedBanner = (props) => {
  const { formatMessage } = props.intl;
  const { url } = props;
  return (
    <div className="contacted-banner justify-center align-center">
      <p>{formatMessage(defaultMessages.mecanoContactedBannerContactedMecano)}</p>
      <Link to={{ pathname: `${url}/review`, state: { status:"finished" }}}>
        <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">done</i> {formatMessage(defaultMessages.mecanoContactedBannerDoneService)}</div>
        <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">done</i> {formatMessage(defaultMessages.mecanoContactedBannerDone)}</div>
      </Link>
      <Link to={{ pathname: `${url}/review`, state: { status:"canceled" }}}>
        <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">clear</i> {formatMessage(defaultMessages.mecanoContactedBannerCanceledService)}</div>
        <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">clear</i> {formatMessage(defaultMessages.mecanoContactedBannerCanceled)}</div>
      </Link>
    </div>
  );
};

ContactedBanner = injectIntl(ContactedBanner);

export { ContactedBanner };
