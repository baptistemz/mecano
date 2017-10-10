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
    this.props.setWhiteNavbar(false);
  }
  render(){
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <div className="banner">
          <img id="banner_logo" src="/wrong_logo.png" alt=""/>
          <div id="banner_title">
            <h1 className='white-shadowed-text'>Restor'it</h1>
            <p className='white-shadowed-text'><big>Entretiens, montages  et réparations <br/> réalisés par vos voisins ou des professionnels proches de chez vous.</big></p>
          </div>
        </div>
        <div className="huge-border"></div>
        <div className="container text-center vertical-marged-100">
          <p><big>Besoin d’un entretien, un montage de pièces ou une réparation ?</big></p>
          <Link to={'/mecano_search'}>
            <Button>Trouver un mécano</Button>
          </Link>
        </div>
        <div className="huge-border hide-on-med-and-down"></div>
        <div className="trapeze-container">
          <div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_1.png" alt=""/>
              <h5>{"Tous types d'interventions"}</h5>
              <div className="divider"></div>
              <p>Réparation, entrerien, rénovation…  Trouvez le mécano correspondant à vos besoins.</p>
            </div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_2.png" alt=""/>
              <h5>À proximité ou à domicile</h5>
              <div className="divider"></div>
              <p>Si vous ne pouvez pas vous déplacer, recherchez un mécano pouvant intervenir à domicile.</p>
            </div>
            <div className="home-card home-card-width-managed translucid-background">
              <img src="/home_icon_3.png" alt=""/>
              <h5>Une solution économique</h5>
              <div className="divider"></div>
              <p>{"Sur Restor'it, faîtes-vous conseiller par un passionné ou payez uniquement la main d’oeuvre d’un professionnel."}</p>
            </div>
          </div>
        </div>
        <div className="huge-border hide-on-med-and-down"></div>
        <div className="container">
          <div className="row">
            <div className="text-center">
              <br/>
              <h3>Mécanos</h3>
              <br/>
              <p>Professionnels ou passionnés, aidez les propriétaires de voitures proches de vous à effectuer tous leurs travaux mécaniques. </p>
              <br/>
              <div className="col s12 l6">
                <div className="home-card column-card secondary-background">
                  <img src="/home_icon_4.png" alt=""/>
                  <h5>Professionnels</h5>
                  <div className="divider"></div>
                  <p>Agrandissez votre clientelle. proposez vos services aux propriétaires de voitures qui ont besoin de vous.</p>
                </div>
              </div>
              <div className="col s12 l6">
                <div className="home-card column-card secondary-background">
                  <img src="/home_icon_5.png" alt=""/>
                  <h5>Passionnés</h5>
                  <div className="divider"></div>
                  <p>Rejoignez une communauté locale aimant les mêmes voitures que vous. Donnez et recevez des conseils pour vos travaux mécaniques.</p>
                </div>
              </div>
              <div className="margin-top-50" style={{ display: "inline-block" }}>
                {this.props.isMecano ?
                  <Link to={'/mecano_profile'}>
                    <Button>Mon profil mécano</Button>
                  </Link>
                  :
                  <Link to={'/mecano_signup'}>
                    <Button>Créer un profil mécano</Button>
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
