import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import { updateTechnicalDomains } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';

class DomainEdit extends Component {
  componentDidMount(){
    this.handleInitialize();
  }
  handleInitialize() {
    const initData = {};
    this.props.domains.map((domain)=>{
      initData[domain] = true;
    });
    this.props.initialize(initData);
  }
  submit(values){
    const { updateTechnicalDomains, mecano_id } = this.props;
    const data = []
    Object.keys(values).map((k)=>{
        if(values[k] !== ""){data.push({kind: "technical_skill", value: k})};
      }
    )
    updateTechnicalDomains(mecano_id, {domains: data}, '/mecano_profile');
  }
  render(){
    const { handleSubmit } = this.props
    return (
      <div>
        <Header>Édition du profil mécano</Header>
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

DomainEdit = reduxForm({
  form: 'domain_edit'
})(DomainEdit);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateTechnicalDomains}, dispatch);
}

function mapStateToProps({ mecano }) {
  const initialValues= {}
  mecano.car_makes.map((make) => { initialValues[make] = true })
  return {
    mecano_id: mecano.id,
    domains: mecano.technical_skills,
    initialValues
  }
}

DomainEdit = connect(mapStateToProps, mapDispatchToProps)(DomainEdit);

export { DomainEdit };
