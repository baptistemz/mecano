import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { registerDomains } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';

class MecanoSearch extends Component {
  submit(values){
    const { registerDomains, mecano_profile } = this.props;
    const data = []
    Object.keys(values).map((k)=> data.push({kind: "technical_skill", name: k}))
    console.log(data)
    registerDomains(mecano_profile.id, {domains: data}, '/mecano_profile')
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <div>
        <Header>Recherche mécano 1/2</Header>
        <div className="container">
          <div className="row">
            <div className="col s12 text-center">
              <h2>Votre Voiture</h2>
            </div>
            <div className="col s12 text-center">
              <h2>Lieu de réparation</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({registerDomains}, dispatch);
}

function mapStateToProps(state) {
  return {
    mecano_profile: state.mecano.mecano_profile
  }
}

MecanoSearch = reduxForm({
  form: 'domain_choice'
})(connect(mapStateToProps, mapDispatchToProps)(MecanoSearch));

export { MecanoSearch };
