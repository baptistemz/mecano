import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { registerDomains } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';

class DomainChoice extends Component {
  submit(values){
    const { registerDomains, mecano_id } = this.props;
    const data = []
    Object.keys(values).map((k)=> data.push({kind: "technical_skill", value: k}))
    registerDomains(mecano_id, {domains: data}, '/mecano_profile')
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <div>
        <Header>Enregistrement mécano 3/3</Header>
        <div className="container">
          <div className="row">
            <div className="col s12 text-center">
              <h2>Mes domaines de compétences</h2>
            </div>
            <br/>
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              <SelectableCard value="wheels" picture='/domains/roues.jpeg' tags={["Jantes", "Roulements"]}>Roues/Pneus</SelectableCard>
              <SelectableCard value="brakes" picture='/domains/freins.jpg' tags={["Plaquettes", "Disques", "Tambours"]}>Freins</SelectableCard>
              <SelectableCard value="timing" picture='/domains/distribution.jpeg' tags={["Courroies", "Chaînes", "Galets"]}>Distribution</SelectableCard>
              <SelectableCard value="exhaust" picture='/domains/echappement.jpeg' tags={["Admission", "Pot"]}>Carburation/Échappement</SelectableCard>
              <SelectableCard value="gearing_system" picture='/domains/embrayage.jpg' tags={["Embrayage", "Boîte de vitesse", "Chaîne de traction"]}>Transmission</SelectableCard>
              <SelectableCard value="car_body" picture='/domains/carrosserie.jpeg' tags={["Tôlerie", "Peinture", "Traitement anti-rouille"]}>Carrosserie</SelectableCard>
              <SelectableCard value="electricity" picture='/domains/electricite.jpeg' tags={["Eclairage", "Batterie", "cables"]}>Électricité</SelectableCard>
              <SelectableCard value="interior" picture='/domains/interieur.jpeg' tags={["Revêtements de sol", "Ciels de toit", "Garnissage"]}>Sellerie</SelectableCard>
              <SelectableCard value="air_conditioning" picture='/domains/climatisation.jpg' tags={["Contrôle de circuit", "Filtres", "Recharge"]}>Climatisation</SelectableCard>
              <SelectableCard value="shock_absorbers" picture='/domains/amortisseurs.jpg' tags={["Suspension", "Bras", "Triangle"]}>Amortisseurs</SelectableCard>
              <SelectableCard value="electronic" picture='/domains/electronique.jpg' tags={["Diagnostic", "Son", "Ordinateur de bord"]}>Électronique</SelectableCard>
              <SelectableCard value="maintenance" picture='/domains/entretien.jpg' tags={["Contrôles", "Vidanges"]}>Entretien</SelectableCard>
            </form>
          </div>
          <div className="col s12">
            <div className="space-between">
              <div></div>
              <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DomainChoice = reduxForm({
  form: 'domain_choice'
})(DomainChoice);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerDomains }, dispatch);
}

function mapStateToProps(state) {
  return {
    mecano_id: state.mecano.id
  }
}

DomainChoice = connect(mapStateToProps, mapDispatchToProps)(DomainChoice);

export { DomainChoice };
