import React, {Component} from 'react';
import Rater from 'react-rater';
import { Button, DomainList } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class Profile extends Component {
  render(){
    const { carMakes, technicalSkills, allVehicles, rating, ratesNumber, description } = this.props;
    const { formatMessage } = this.props.intl
    return(
      <div>
        {description === null || description.length === 0 ?
          <div></div>
        :
          <div className="box-shadow white-background marged-20 padded-20">
            <h5 className="capitalize text-center">{formatMessage(defaultMessages.mecanoDescription)}</h5>
            <p>{description}</p>
          </div>
        }
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="capitalize text-center">{formatMessage(defaultMessages.mecanoReviews)}</h5>
          <div className="big-stars">
            <Rater rating={rating} interactive={false} />
            <span>({ratesNumber})</span>
          </div>
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
