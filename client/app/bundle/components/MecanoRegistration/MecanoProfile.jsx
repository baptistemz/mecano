import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from '../../common/index';

class MecanoProfile extends Component {

  render(){
    return (
      <div>
        <Header>Mon profil mécano</Header>
        <div className="cover-picture">

        </div>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="box-shadow">

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

function mapStateToProps(state) {
  return {
    mecano_profile: state.mecano.mecano_profile
  }
}

export { connect(mapStateToProps, mapDispatchToProps)(MecanoProfile) };
