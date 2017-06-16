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
                    <ProfilePicture />
                    <div>
                      <h5>{pro? mecano_profile.company_name : `${first_name.charAt(0).toUpperCase() + first_name.slice(1)} ${last_name.charAt(0).toUpperCase()}`}</h5>
                      <p>{pro? "professionnel" : "passionné"}</p>
                    </div>
                  <hr/>
                  <p>{mecano_profile.city}, {mecano_profile.country}</p>
                  {mecano_profile.mobile ? <p className="green-text">Se déplace</p> : <p className="red-text">Ne se déplace pas</p>}
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <h5 className="text-center">Avis</h5>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <h5 className="text-center">Domaines techniques</h5>
                  <br/>
                  <ul className="collection">
                    {technical_skills.map((skill)=>{
                      return <li key={skill} className="collection-item"><div>{skill}<div className="secondary-content">0 <a><i className="material-icons">grade</i></a></div></div></li>
                    })}
                  </ul>
                </div>
                <div className="box-shadow marged-20 padded-20">
                  <h5 className="text-center">Véhicules</h5>
                  <br/>
                  <p className="green-text">{mecano_profile.all_vehicles ? "intervient sur tous vehicules" : ''}</p>
                    <ul className="collection">
                      {car_makes.map((make)=>{
                        return <li key={make} className="collection-item"><div>{make}<div className="secondary-content">0 <a><i className="material-icons">grade</i></a></div></div></li>
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
