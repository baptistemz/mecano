import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from './index';

const ContactedBanner = ({ url }) => {
  return (
    <div className="contacted-banner justify-center align-center">
      <p>Mécano contacté.</p>
      <Link to={{ pathname: `${url}/review`, state: { status:"finished" }}}>
        <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">done</i> Service effectué</div>
        <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">done</i> effectué</div>
      </Link>
      <Link to={{ pathname: `${url}/review`, state: { status:"canceled" }}}>
        <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">clear</i> Service annulé</div>
        <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">clear</i> annulé</div>
      </Link>
    </div>
  );
};

export { ContactedBanner };
