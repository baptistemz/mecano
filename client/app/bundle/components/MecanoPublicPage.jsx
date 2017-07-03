import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMecanoProfile } from '../actions/index';
import { Header, ProfilePicture, Loader, Button } from '../common/index';

class MecanoPublicPage extends Component {
  constructor(){
    super()
    this.state = { loading : true }
  }
  componentWillMount(){
    this.props.fetchMecanoProfile(this.props.match.params.id);
    this.setState({ loading: true });
  }
  componentWillReceiveProps(newProps){
    if(newProps.id.toString() === this.props.match.params.id){
      this.setState({ loading: false });
    }
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
                    <div className="contact-btn">
                      <Button icon="chat_bubble_outline"></Button>
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
              <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                <Button fullWidth="true" icon="chat_bubble_outline">Contacter</Button>
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
    picture: mecano_visited.picture,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MecanoPublicPage)
