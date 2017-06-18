
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, ProfilePicture } from '../../common/index';

class MecanoProfile extends Component {

  render(){
    const { mecano_profile, car_makes, technical_skills, pro, first_name, last_name } = this.props;
    return (
      <div>
        <Header>Mon profil mécano</Header>
        <div className="cover-picture"></div>
        <div className="profile-boxes">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="box-shadow marged-20 padded-20">
                  <div className="box-edit btn btn-floating">
                    <i className="material-icons">edit</i>
                  </div>
                  <div className="direction-row">
                    <ProfilePicture />
                    <div className="profile-content">
                      <h5 className="capitalize">{pro? mecano_profile.company_name : `${first_name} ${last_name.charAt(0).toUpperCase()}`}</h5>
                      <p>{pro? "professionnel" : "passionné"}</p>
                      <h6 className="primary-text">{pro? `${mecano_profile.price}€/h` : '' }</h6>
                    </div>
                  </div>
                  <hr/>
                  <div className="space-between">
                    <p className="no-margin">{mecano_profile.city}, {mecano_profile.country}</p>
                    {mecano_profile.mobile ? <p className="no-margin green-text">Se déplace</p> : <p className="no-margin red-text">Ne se déplace pas</p>}
                  </div>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <div className="box-edit btn btn-floating">
                    <i className="material-icons">edit</i>
                  </div>
                  <h5 className="text-center">Avis</h5>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <div className="box-edit btn btn-floating">
                    <i className="material-icons">edit</i>
                  </div>
                  <h5 className="text-center">Domaines techniques</h5>
                  <br/>
                  <ul className="collection">
                    {technical_skills.map((skill)=>{
                      return <li key={skill} className="collection-item"><div className="capitalize">{skill}<a className="secondary-content recommendation-number">0</a></div></li>
                    })}
                  </ul>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <div className="box-edit btn btn-floating">
                    <i className="material-icons">edit</i>
                  </div>
                  <h5 className="text-center">Véhicules</h5>
                  <br/>
                  <p className="green-text">{mecano_profile.all_vehicles ? "intervient sur tous vehicules" : ''}</p>
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
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ mecano, auth }) {
  return {
    mecano_profile: mecano.mecano_profile,
    car_makes: mecano.car_makes,
    technical_skills: mecano.technical_skills,
    first_name: auth.first_name,
    last_name: auth.last_name,
    pro: mecano.mecano_profile.pro
  }
}

MecanoProfile = connect(mapStateToProps, mapDispatchToProps)(MecanoProfile)
export { MecanoProfile };
