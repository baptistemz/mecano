import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import _ from 'lodash';
import { updateMecanoProfile, validateToken } from '../../actions/index';
import { MissingContentBanner, WallPictureUpdate } from './index';
import { Header, ProfilePicture, Button, ReviewList, DomainList, Loader } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';
import textareaExpand from '../../utils/textareaExpand'

class MecanoProfile extends Component {
  constructor(props){
    super(props);
    this.state={ description: props.decription, loading: true }
  }
  submitDescription(){
    const { id, updateMecanoProfile } = this.props;
    updateMecanoProfile(id, { description: this.refs.description.value });
    $('#description_modal').modal('close');
  }
  textareaChange(e){
    e ? e.preventDefault() : null
    this.setState({ description: e.target.value})
  }
  componentDidUpdate(previousProps){
    const { description, display_name } = this.props;
    if (description != previousProps.description){this.setState({ description })};
    if (display_name && !previousProps.display_name){this.setState({ loading: false })};
  }

  componentDidMount(){
    $('.modal').modal();
    textareaExpand($('#descriptionText'));
    if(this.props.display_name){this.setState({ loading: false })}
  }
  render(){
    const { id, display_name, car_makes, technical_skills, pro, price, mobile, city, country, all_vehicles, description, rating, rates_number, reviews, wall_picture } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className="boxes-background">
        <Header>Mon profil mécano</Header>
        {
          this.state.loading ?
            <Loader background={true} />
          :
            <div></div>
        }
        <div className="cover-picture" style={{ backgroundImage: `url(${wall_picture.url})` }}>
          <div className="modal-trigger" data-target="wall_picture_modal">
            <div className="background-edit btn btn-floating">
              <i className="material-icons">edit</i>
            </div>
          </div>
          <div id="wall_picture_modal" className="modal">
            <div className="modal-content">
              <div className="full-width text-center">
                <h2>Changez la photo de votre page</h2>
                <WallPictureUpdate />
              </div>
            </div>
          </div>
        </div>
        {
          technical_skills.length < 1 || (car_makes.length < 1 && !all_vehicles) ?
            <MissingContentBanner domains={!technical_skills} vehicles={!all_vehicles && !car_makes}/>
            :
            <div></div>
        }
        <div className="profile-boxes">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="box-shadow white-background white-background marged-20 padded-20">
                  <Link to={"/mecano_edit"}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <div className="direction-row">
                    <ProfilePicture currentUser={true}/>
                    <div className="profile-content">
                      <h3 className="capitalize">{ display_name }</h3>
                      <p>{pro === "pro" ? formatMessage(defaultMessages.mecanoPro) : formatMessage(defaultMessages.mecanoNonPro)}</p>
                      <h6 className="primary-text">{pro === "pro"? `${price}€/h` : '' }</h6>
                    </div>
                  </div>
                  <hr/>
                  <div className="space-between">
                    <p className="no-margin">{city}, {country}</p>
                    {mobile === "mobile" ? <p className="no-margin green-text">{formatMessage(defaultMessages.mecanoMobile)}</p> : <p className="no-margin red-text">{formatMessage(defaultMessages.mecanoNonMobile)}</p>}
                  </div>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <h4 className="text-center capitalize">{formatMessage(defaultMessages.mecanoDescription)}</h4>
                  <div className="modal-trigger" data-target="description_modal">
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </div>
                  <div id="description_modal" className="modal">
                    <div className="modal-content">
                      <form className="margin-bottom-20">
                        <div className="full-width text-center">
                          <h2>Saisissez votre description</h2>
                        </div>
                        <br/>
                        <label htmlFor="descriptionText">{formatMessage(defaultMessages.mecanoDescription)}</label>
                        <textarea id="descriptionText" onChange={(e) => this.textareaChange(e)} value={this.state.description || ""} ref="description" className="materialize-textarea" data-length={400}></textarea>
                      </form>
                      <Button style={{ marginTop: '20px' }} clickTrigger={() => this.submitDescription()} fullWidth={true} type="submit">Enregistrer</Button>
                    </div>
                  </div>
                  {description === null || description.length === 0 ?
                    <i><p className="red-text">/!\ {formatMessage(defaultMessages.mecanoNoDescriptionMessage)}</p></i>
                  :
                    <p>{description}</p>
                  }
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <div className="big-stars">
                    <Rater rating={rating} interactive={false} />
                    <span>({rates_number})</span>
                  </div>
                  {reviews.length > 0 ?
                    <ReviewList title={formatMessage(defaultMessages.mecanoReviews)}
                      reviews={reviews} expandable={ reviews.length < rates_number}
                      loadMessage="Autres avis..." id={id} />
                  :
                    <div></div>
                  }
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <Link to={'/domain_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h4 className="text-center capitalize">{formatMessage(defaultMessages.mecanoTechnicalSkillsString)}</h4>
                  <br/>
                  {technical_skills.length < 1 ? <div className="red-text"><i className="material-icons">error</i>{formatMessage(defaultMessages.mecanoNoTechnicalSkillMessage)}</div> : <div></div>}
                  <DomainList kind="technical_skills" domains={technical_skills}  ownProfile={ false }/>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <Link to={'/vehicle_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h4 className="text-center capitalize">{formatMessage(defaultMessages.mecanoVehicles)}</h4>
                  <br/>
                  {(car_makes.length < 1 && !all_vehicles) ? <div className="red-text"><i className="material-icons">error</i>{formatMessage(defaultMessages.mecanoNoVehicleMessage)}</div> : <div></div>}
                  <p className="green-text uppercase">{all_vehicles ? formatMessage(defaultMessages.mecanoAllVehiclesMessage) : ''}</p>
                  <DomainList kind="car_makes" domains={car_makes} ownProfile={ false }/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, validateToken }, dispatch);
}

function mapStateToProps({ mecano }) {
  const { car_makes, technical_skills, display_name, pro, id, price, city, country,
    mobile, all_vehicles, rating, rates_number, description, reviews, wall_picture } = mecano
  return { car_makes, technical_skills, display_name, pro, id, price, city, country,
    mobile, all_vehicles, rating, rates_number, description, reviews, wall_picture }
}

MecanoProfile = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoProfile))
export { MecanoProfile };
