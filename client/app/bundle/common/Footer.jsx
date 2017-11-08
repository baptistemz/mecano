import React from 'react';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

let Footer = (props) => {
  const { formatMessage } = props.intl;
  return (
    <div className="footer">
      <div className="container">
        <h6>Restorit</h6>
        <hr/>
        <div className="space-between">
          <a>{formatMessage(defaultMessages.termsOfUse).toUpperCase()}</a>
          <a className="hide-on-small-only">{formatMessage(defaultMessages.contact)}</a>
          <div className="space-around social-links">
            <a><i className="fa fa-facebook"></i></a>
            <a><i className="fa fa-twitter"></i></a>
            <a><i className="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer = injectIntl(Footer);

export { Footer };
