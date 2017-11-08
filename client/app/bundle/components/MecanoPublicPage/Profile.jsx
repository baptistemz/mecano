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
        {description ?
          <div className="box-shadow white-background marged-20 padded-20">
            <h4 className="capitalize text-center">{formatMessage(defaultMessages.mecanoDescription)}</h4>
            <p>{description}</p>
          </div>
        :
          <div></div>
        }
        <div className="box-shadow white-background marged-20 padded-20">
          <div className="big-stars">
            <Rater rating={rating} interactive={false} />
            <span>({ratesNumber || 0})</span>
          </div>
          {reviews.length > 0 ?
            <ReviewList title={`${formatMessage(defaultMessages.mecanoReviews)} (${ratesNumber})`}
              reviews={reviews} expandable={ reviews.length < ratesNumber}
              loadMessage="Autres avis..." id={id} />
          :
            <div></div>
          }
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h4 className="text-center">{formatMessage(defaultMessages.mecanoTechnicalSkillsString)}</h4>
          <br/>
          <DomainList kind="technical_skills" domains={technicalSkills} ownProfile={ true }/>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h4 className="text-center capitalize">{formatMessage(defaultMessages.mecanoVehicles)}</h4>
          <br/>
          <p className="green-text uppercase">{allVehicles ? formatMessage(defaultMessages.mecanoAllVehiclesMessage) : ''}</p>
          <DomainList kind="car_makes" domains={carMakes} ownProfile={ true }/>
        </div>
      </div>
    )
  }
}

Profile = injectIntl(Profile)

export { Profile }
