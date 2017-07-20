import React, {Component} from 'react';
import Rater from 'react-rater';
import { Button, DomainList, ReviewList } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class Profile extends Component {
  render(){
    const { id, carMakes, technicalSkills, allVehicles, rating, ratesNumber, description, reviews } = this.props;
    const { formatMessage } = this.props.intl
    return(
      <div>
        {description === null || description.length === 0 ?
          <div></div>
        :
          <div className="box-shadow white-background marged-20 padded-20">
            <h6 className="capitalize text-center">{formatMessage(defaultMessages.mecanoDescription)}</h6>
            <p>{description}</p>
          </div>
        }
        <div className="box-shadow white-background marged-20 padded-20">
          <div className="big-stars">
            <Rater rating={rating} interactive={false} />
            <span>({ratesNumber})</span>
          </div>
          <ReviewList title={formatMessage(defaultMessages.mecanoReviews)}
            reviews={reviews} expandable={ reviews.length < ratesNumber}
            loadMessage="Autres avis..." id={id} />
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="text-center">Domaines techniques</h5>
          <br/>
          <DomainList kind="technical_skills" domains={technicalSkills}/>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="text-center capitalize">{formatMessage(defaultMessages.mecanoVehicles)}</h5>
          <br/>
          <p className="green-text uppercase">{allVehicles ? formatMessage(defaultMessages.mecanoAllVehiclesMessage) : ''}</p>
          <DomainList kind="car_makes" domains={carMakes}/>
        </div>
      </div>
    )
  }
}

Profile = injectIntl(Profile)

export { Profile }
