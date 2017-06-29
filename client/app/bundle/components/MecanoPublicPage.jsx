import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMecanoProfile } from '../actions/index';
import { Header, ProfilePicture, Loader } from '../common/index';

class MecanoPublicPage extends Component {
  constructor(){
    super()
    this.state = { loading : true }
  }
  componentWillMount(){
    this.props.fetchMecanoProfile(this.props.match.params.id);
    this.setState({ loading: true });
  }
  componentDidUpdate(){
    this.setState({ loading: false });
  }
  render(){
    const { car_makes, technical_skills, display_name, pro, price, city, country, mobile, all_vehicles, rating, picture } = this.props;
    if(this.state.loading){
      return <Loader/>
    }
    return (
      <div>
        <Header>{display_name}</Header>
        <div className="cover-picture"></div>
        <div className="profile-boxes">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="box-shadow white-background white-background marged-20 padded-20">
                  <div className="direction-row">
                    <ProfilePicture imgSrc={picture.thumb.url} currentUser={false}/>
                    <div className="profile-content">
                      <h5 className="capitalize">{display_name}</h5>
                      <p>{pro? "professionnel" : "passionné"}</p>
                      <h6 className="primary-text">{pro? `${price}€/h` : '' }</h6>
                    </div>
                  </div>
                  <hr/>
                  <div className="space-between">
                    <p className="no-margin">{city}, {country}</p>
                    {mobile ? <p className="no-margin green-text">Se déplace</p> : <p className="no-margin red-text">Ne se déplace pas</p>}
                  </div>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <h5 className="text-center">Avis</h5>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <h5 className="text-center">Domaines techniques</h5>
                  <br/>
                  <ul className="collection">
                    {technical_skills.map((skill)=>{
                      return <li key={skill.id} className="collection-item"><div className="capitalize">{skill.name}<a className="secondary-content recommendation-number">0</a></div></li>
                    })}
                  </ul>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <h5 className="text-center">Véhicules</h5>
                  <br/>
                  <p className="green-text">{all_vehicles ? "INTERVIENT SUR TOUS VÉHICULES" : ''}</p>
                    <ul className="collection">
                      {car_makes.map((make)=>{
                        return <li key={make.id} className="collection-item"><div className="capitalize">{make.name}<a className="secondary-content recommendation-number">0</a></div></li>
                      })}
                    </ul>
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
  return bindActionCreators({ fetchMecanoProfile }, dispatch);
}

function mapStateToProps({ mecano, auth }) {
  return {
    car_makes: mecano.car_makes,
    technical_skills: mecano.technical_skills,
    display_name: mecano.display_name,
    pro: mecano.pro,
    price: mecano.price,
    city: mecano.city,
    country: mecano.country,
    mobile: mecano.mobile,
    all_vehicles: mecano.all_vehicles,
    rating: mecano.rating,
    picture: mecano.picture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MecanoPublicPage)
