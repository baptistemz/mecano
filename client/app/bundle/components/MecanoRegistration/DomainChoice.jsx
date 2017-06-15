import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {  } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, SelectableCard } from '../../common/index';

class DomainChoice extends Component {
  submit(values){
    console.log(values)
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
              <SelectableCard value="carrosserie" picture='/domains/carrosserie.jpeg' tags={["Tôlerie", "Peinture", "Traitement anti-rouille"]}>Carrosserie</SelectableCard>
              <SelectableCard value="roues" picture='/domains/roues.jpeg' tags={["Jantes", "Roulements"]}>Roues/Pneus</SelectableCard>
              <SelectableCard value="freins" picture='/domains/freins.jpg' tags={["Plaquettes", "Disques", "Tambours"]}>Freins</SelectableCard>
              <SelectableCard value="amortisseurs" picture='/domains/amortisseurs.jpg' tags={["Suspension", "Bras", "Triangle"]}>Amortisseurs</SelectableCard>
              <SelectableCard value="distribution" picture='/domains/distribution.jpeg' tags={["Courroies", "Chaînes", "Galets"]}>Distribution</SelectableCard>
              <SelectableCard value="transmission" picture='/domains/embrayage.jpg' tags={["Embrayage", "Boîte de vitesse", "Chaîne de traction"]}>Transmission</SelectableCard>
              <SelectableCard value="sellerie" picture='/domains/interieur.jpeg' tags={["Revêtements de sol", "Ciels de toit", "Garnissage"]}>Sellerie</SelectableCard>
              <SelectableCard value="electricité" picture='/domains/electricite.jpeg' tags={["Eclairage", "Batterie", "cables"]}>Électricité</SelectableCard>
              <SelectableCard value="climatisation" picture='/domains/climatisation.jpg' tags={["Contrôle de circuit", "Filtres", "Recharge"]}>Climatisation</SelectableCard>
              <SelectableCard value="electronique" picture='/domains/electronique.jpg' tags={["Diagnostic", "Son", "Ordinateur de bord"]}>Électronique</SelectableCard>
              <SelectableCard value="carburation" picture='/domains/echappement.jpeg' tags={["Admission", "Pot"]}>Carburation/Échappement</SelectableCard>
              <SelectableCard value="entretien" picture='/domains/entretien.jpg' tags={["Contrôles", "Vidanges"]}>Entretien</SelectableCard>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  const { vehicle_choice } = state.form
  return {
    car_makes_list: state.vehicle.car_makes_list,
    selected_car_makes: state.vehicle.selected_car_makes,
    only_vehicle_brands: (vehicle_choice && vehicle_choice.values && (vehicle_choice.values.all_vehicles === "certaines marques"))
  }
}

DomainChoice = reduxForm({
  form: 'domain_choice'
})(connect(mapStateToProps, mapDispatchToProps)(DomainChoice));

export { DomainChoice };
