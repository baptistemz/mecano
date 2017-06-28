import Rater from 'react-rater'
import React from 'react';
import { ProfilePicture } from '../../common/index';

const MecanoCard = ({ id, title, pro, mobile, price, rating, imgSrc, distance }) => {
  return(
    <div className="col s12 offset-m2 m8 l6">
      <div className="box-shadow mecano-card margin-top-20">
        <div className="distance-chip">{distance.toFixed(1)} km</div>
        <div style={{width: "100px", height:"100px"}}>
          <ProfilePicture imgSrc={imgSrc} currentUser={false}/>
        </div>
        <div className="card-content">
          <div className="card-title-container align-items">
            <h4>{title}</h4>
          </div>
          <div className="space-between flex-end">
            <p>{pro ? "Professionnel" : "Passionné"}</p>
            <span><Rater interactive={false} rating={rating} /></span>
          </div>
          <div className="space-between flex-end">
            {mobile ?
              <p className="green-text">Se déplace</p>
              :
              <p className="red-text">Ne se déplace pas</p>
            }
            {pro ?
              <p className="primary-text"><big>{price}€/h</big></p>
            :
              <p className="primary-text"><big>---</big></p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export { MecanoCard };
