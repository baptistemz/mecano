import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setWhiteNavbar } from '../actions/index';
import { Button } from '../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';


class Home extends Component{
  componentWillMount(){
    this.props.setWhiteNavbar(true);
  }
  componentWillUnmount(){
    if (this.props.history.location.pathname !== '/'){
      this.props.setWhiteNavbar(false);
    }
  }
  componentDidMount(){
    let scrollTo = (element, time) => {$('html, body').animate({ scrollTop: element.offset().top}, time)}
    let goDown = () => scrollTo($("#firstAnchor"), 1000);
    $("#topArrow").click(goDown);
  }
  render(){
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className="banner">
          <div className="title-group">
            <h1 className='white-shadowed-text'>Restor'it</h1>
            <hr/>
            <h2 className='white-shadowed-text'>{formatMessage(defaultMessages.homeBannerSubtitle)}</h2>
            <h2 className='white-shadowed-text'>{formatMessage(defaultMessages.homeMadeBy)} <span className="primary-text">{formatMessage(defaultMessages.homeNonPros)}</span> {formatMessage(defaultMessages.homeAnd)} <span className="primary-text">{formatMessage(defaultMessages.homePros)}</span> {formatMessage(defaultMessages.homeCloseToYou)}</h2>
          </div>
          <a id="topArrow" className="scroll-arrow">
            <i className="material-icons">keyboard_arrow_down</i>
          </a>
        </div>
        <div id="firstAnchor" className="huge-border"></div>
        <div className="container text-center vertical-marged-100">
          <p><big>{formatMessage(defaultMessages.homeNeedMecanoQuestion)}</big></p>
          <Link to={'/mecano_search'}>
            <Button>{formatMessage(defaultMessages.homeFindAMecano)}</Button>
          </Link>
        </div>
        <div className="huge-border hide-on-med-and-down"></div>
        <div className="trapeze-container">
          <div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_1.png" alt=""/>
              <h5>{formatMessage(defaultMessages.homeFirstUserCardTitle)}</h5>
              <div className="divider"></div>
              <p>{formatMessage(defaultMessages.homeFirstUserCardText)}</p>
            </div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_2.png" alt=""/>
              <h5>{formatMessage(defaultMessages.homeSecondUserCardTitle)}</h5>
              <div className="divider"></div>
              <p>{formatMessage(defaultMessages.homeSecondUserCardText)}</p>
            </div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_3.png" alt=""/>
              <h5>{formatMessage(defaultMessages.homeThirdUserCardTitle)}</h5>
              <div className="divider"></div>
              <p>{formatMessage(defaultMessages.homeThirdUserCardText)}</p>
            </div>
          </div>
        </div>
        <div className="huge-border hide-on-med-and-down"></div>
        <div className="container">
          <div className="row">
            <div className="text-center">
              <br/>
              <h3>{formatMessage(defaultMessages.homeMecanos)}</h3>
              <br/>
              <p>{formatMessage(defaultMessages.homeMecanoCardIntro)}</p>
              <br/>
              <div className="col s12 l6">
                <div className="home-card column-card secondary-background">
                  <img src="/home_icon_4.png" alt=""/>
                  <h5>{formatMessage(defaultMessages.homeFirstMecanoCardTitle)}</h5>
                  <div className="divider"></div>
                  <p>{formatMessage(defaultMessages.homeFirstMecanoCardText)}</p>
                </div>
              </div>
              <div className="col s12 l6">
                <div className="home-card column-card secondary-background">
                  <img src="/home_icon_5.png" alt=""/>
                  <h5>{formatMessage(defaultMessages.homeSecondMecanoCardTitle)}</h5>
                  <div className="divider"></div>
                  <p>{formatMessage(defaultMessages.homeSecondMecanoCardText)}</p>
                </div>
              </div>
              <div className="margin-top-50" style={{ display: "inline-block" }}>
                {this.props.isMecano ?
                  <Link to={'/mecano_profile'}>
                    <Button>{formatMessage(defaultMessages.homeMyMecanoProfile)}</Button>
                  </Link>
                  :
                  <Link to={'/mecano_signup'}>
                    <Button>{formatMessage(defaultMessages.homeCreateAMecanoProfile)}</Button>
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setWhiteNavbar }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    isMecano: auth.is_mecano
  }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default injectIntl(Home);
