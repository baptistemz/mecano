import Rater from 'react-rater'
import React from 'react';
import { Link } from 'react-router-dom';
import { ProfilePicture } from '../../common/index';

const MecanoCard = ({ id, title, pro, mobile, price, rating, imgSrc, distance, city, country }) => {
  return(
    <div className="col s12 offset-m2 m8 l6">
      <Link to={`/mecanos/${title.replace(/\s/g, '-')}_${city.replace(/\s/g, '-')}_${country.replace(/\s/g, '-')}_${id}`}>
        <div className="box-shadow mecano-card margin-top-20">
          { distance ?
            <div className="distance-chip">{distance.toFixed(1)} km</div>
            :
            <div></div>
          }
          <div style={{width: "100px", height:"100px"}}>
            <ProfilePicture imgSrc={imgSrc} currentUser={false}/>
          </div>
          <div className="card-content">
            <div className="card-title-container align-items">
              <h4 className="secondary-text">{title}</h4>
            </div>
            <div className="space-between flex-end">
              {pro ? <p className="bold-grey primary-text">Professionnel</p> : <p className="bold-grey ">Passionné</p>}
              <span><Rater interactive={false} rating={rating} /></span>
            </div>
            <div className="space-between flex-end">
              {mobile ?
                <p className="green-text">Se déplace</p>
                :
                <p className="red-text">Ne se déplace pas</p>
              }
              {pro ?
                <p className="secondary-text"><big>{price}€/h</big></p>
                :
                <p className="secondary-text"><big>---</big></p>
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export { MecanoCard };
