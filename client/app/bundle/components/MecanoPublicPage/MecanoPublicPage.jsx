import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Route, Link, withRouter } from 'react-router-dom';
import PrivateRoute from '../../containers/PrivateRoute';
import { fetchMecanoProfile } from '../../actions/index';
import { Header, ProfilePicture, Loader, Button } from '../../common/index';
import { ContactForm, ContactedBanner, Profile, Review } from './index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoPublicPage extends Component {
  constructor(props){
    super(props)
    const splitted_slug = props.match.params.id.toString().split('_')
    this.state = {
      loading : true,
      id: splitted_slug[splitted_slug.length - 1],
      inContactForm: false
    }
  }
  componentWillMount(){
    this.props.fetchMecanoProfile(this.state.id);
    this.setState({ loading: true });
  }
  componentWillReceiveProps(newProps){
    this.setState({inContactForm: newProps.location.pathname.endsWith("contact") })
    if(newProps.id.toString() === this.state.id){
      this.setState({ loading: false });
    }
  }
  contactButton(small=false){
    const { formatMessage } = this.props.intl
    const { inContactForm } = this.state
    const props = {
      linkClass: small ? "contact-btn" : "",
      spanClass: small ? "hide-on-small-only" : "",
      buttonIcon: inContactForm ? "navigate_before" : "chat_bubble_outline",
      buttonText: inContactForm ? "Retour au profil" : formatMessage(defaultMessages.mecanoContact),
      url: inContactForm ? this.props.match.url : `${this.props.match.url}/contact`
    }
      return(
        <Link to={props.url} className={props.linkClass}>
          <Button fullWidth={!small} icon={props.buttonIcon}>
            <span className={props.spanClass}>{props.buttonText}</span>
          </Button>
        </Link>
      )
  }
  render(){
    const { isAuthenticated, car_makes, technical_skills, display_name, pro, price, city, country, mobile, all_vehicles, rating, rates_number, description, picture, isContacted } = this.props;
    const { formatMessage } = this.props.intl
    if(this.state.loading){
      return(
        <div className="search-loader-center">
          <Loader />
        </div>
      )
    }
    return (
      <div className="boxes-background">
        <Header>{display_name}</Header>
        <div className="cover-picture"></div>
        {isContacted ?
          <ContactedBanner url={this.props.match.url} />
        :
          <div></div>
        }
        <div className="profile-boxes">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="box-shadow white-background white-background marged-20 padded-20">
                  <div className="direction-row">
                    <ProfilePicture imgSrc={picture.thumb.url} currentUser={false}/>
                    <div className="profile-content">
                      <h5 className="capitalize">{display_name}</h5>
                      <p>{pro? formatMessage(defaultMessages.mecanoPro) : formatMessage(defaultMessages.mecanoNonPro)}</p>
                      <h6 className="primary-text">{pro? `${price}€/h` : '' }</h6>
                    </div>
                    {!isContacted ?
                      this.contactButton(true)
                    :
                      <div></div>
                    }
                  </div>
                  <hr/>
                  <div className="space-between">
                    <p className="no-margin">{city}, {country}</p>
                    {mobile ? <p className="no-margin green-text">{formatMessage(defaultMessages.mecanoMobile)}</p> : <p className="no-margin red-text">{formatMessage(defaultMessages.mecanoNonMobile)}</p>}
                  </div>
                </div>
                <Route exact path={this.props.match.url} render={() =>
                    <Profile carMakes={car_makes} technicalSkills={technical_skills} description={description} allVehicles={all_vehicles} rating={rating} ratesNumber={rates_number} />
                  }/>
                <PrivateRoute path={`${this.props.match.url}/contact`} isAuthenticated={isAuthenticated} registerMethod="login" component={ContactForm} />
                <PrivateRoute path={`${this.props.match.url}/review`} isAuthenticated={isAuthenticated} registerMethod="login" component={Review} />
              </div>
              <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                {!isContacted ?
                  this.contactButton()
                :
                  <div></div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMecanoProfile }, dispatch);
}

function mapStateToProps({ mecano_visited, auth }) {
  return {
    id: mecano_visited.id,
    car_makes: mecano_visited.car_makes,
    technical_skills: mecano_visited.technical_skills,
    display_name: mecano_visited.display_name,
    pro: mecano_visited.pro,
    price: mecano_visited.price,
    city: mecano_visited.city,
    country: mecano_visited.country,
    mobile: mecano_visited.mobile,
    all_vehicles: mecano_visited.all_vehicles,
    rating: mecano_visited.rating,
    rates_number: mecano_visited.rates_number,
    picture: mecano_visited.picture,
    description: mecano_visited.description,
    isContacted: mecano_visited.contacted,
    isAuthenticated: auth.isAuthenticated,
  }
}

MecanoPublicPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(MecanoPublicPage))

MecanoPublicPage = injectIntl(MecanoPublicPage)

export { MecanoPublicPage }
