import React from 'react';
import {Button} from './index';

const ContactedBanner = () => {
  return (
    <div className="contated-banner justify-center align-center">
      <p>Mécano contacté.</p>
      <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">done</i> Service effectué</div>
      <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">done</i> effectué</div>
      <div className="banner-btn btn-small hide-on-small-only"><i className="material-icons">clear</i> Service annulé</div>
      <div className="banner-btn btn-small hide-on-med-and-up"><i className="material-icons">clear</i> annulé</div>
    </div>
  );
};

export { ContactedBanner };
