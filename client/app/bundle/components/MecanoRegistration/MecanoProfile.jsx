import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMecanoProfile } from '../../actions/index';
import { Header, ProfilePicture } from '../../common/index';

class MecanoProfile extends Component {
  componentWillMount(){
    console.log("on va chercher", this.props.mecano_id)
    // this.props.fetchMecanoProfile(this.props.mecano_id);
  }
  render(){
    const { display_name, car_makes, technical_skills, pro, price, mobile, city, country, all_vehicles } = this.props;
    console.log("technical_skills", technical_skills)
    return (
      <div>
        <Header>Mon profil mécano</Header>
        <div className="cover-picture"></div>
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
                      <h5 className="capitalize">{ display_name }</h5>
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
                  <Link to={'/domain_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h5 className="text-center">Domaines techniques</h5>
                  <br/>
                  <ul className="collection">
                    {technical_skills.map((skill)=>{
                      return <li key={skill} className="collection-item"><div className="capitalize">{skill}<a className="secondary-content recommendation-number">0</a></div></li>
                    })}
                  </ul>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <Link to={'/vehicle_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h5 className="text-center">Véhicules</h5>
                  <br/>
                  <p className="green-text">{all_vehicles ? "INTERVIENT SUR TOUS VÉHICULES" : ''}</p>
                    <ul className="collection">
                      {car_makes.map((make)=>{
                        return <li key={make} className="collection-item"><div className="capitalize">{make}<a className="secondary-content recommendation-number">0</a></div></li>
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
    mecano_id: mecano.id,
    price: mecano.price,
    city: mecano.city,
    country: mecano.country,
    mobile: mecano.mobile,
    all_vehicles: mecano.all_vehicles,
    rating: mecano.rating,
  }
}

MecanoProfile = connect(mapStateToProps, mapDispatchToProps)(MecanoProfile)
export { MecanoProfile };
