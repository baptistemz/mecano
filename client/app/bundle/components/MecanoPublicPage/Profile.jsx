import React, {Component} from 'react';
import { Button } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class Profile extends Component {
  render(){
    const { carMakes, technicalSkills, allVehicles, rating } = this.props;
    const { formatMessage } = this.props.intl
    return(
      <div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="capitalize text-center">{formatMessage(defaultMessages.mecanoReviews)}</h5>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="text-center">Domaines techniques</h5>
          <br/>
          <ul className="collection">
            {technicalSkills.map((skill)=>{
              let key = _.camelCase('mecano_technical_skills_' + skill.value)
              return <li key={skill.id} className="collection-item"><div className="capitalize">{formatMessage(defaultMessages[key])}<a className="secondary-content recommendation-number">0</a></div></li>
            })}
          </ul>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="text-center capitalize">{formatMessage(defaultMessages.mecanoVehicles)}</h5>
          <br/>
          <p className="green-text uppercase">{allVehicles ? formatMessage(defaultMessages.mecanoAllVehiclesMessage) : ''}</p>
          <ul className="collection">
            {carMakes.map((make)=>{
              return <li key={make.id} className="collection-item"><div className="capitalize">{make.name}<a className="secondary-content recommendation-number">0</a></div></li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

Profile = injectIntl(Profile)

export { Profile }
