import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from './index';

const MissingContentBanner = () => {
  return (
    <div className="missing-content-banner justify-center align-center">
      <i className="material-icons">error</i>
      <p>
        Votre profil n'est pas visible par les utilisateurs de Restor'it. Révisez les erreurs ci-dessous.
      </p>
    </div>
  );
};

export { MissingContentBanner };
