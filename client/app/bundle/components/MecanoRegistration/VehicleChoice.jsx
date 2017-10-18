import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchCarMakes, selectCarMake, removeCarMake, updateCarDomains, updateMecanoProfile } from '../../actions/index';
import autocomplete from '../../utils/autocomplete';
import { Header, Input, RadioButtons } from '../../common/index';

class VehicleChoice extends Component {
  componentDidMount(){
    //GET CAR MAKES LIST
    this.props.fetchCarMakes();

    const { selectCarMake, removeCarMake, car_makes_list }= this.props;
    let list
    if (car_makes_list.length === 0){
      list = {
       "abarth": null, "ac": null, "acura": null, "alfa-romeo": null, "allard": null, "alpina": null, "alpine": null, "alvis": null, "amc": null, "ariel": null, "armstrong-siddeley": null, "ascari": null, "aston-martin": null, "audi": null, "austin": null, "austin-healey": null, "autobianchi": null, "auverland": null, "avanti": null, "beijing": null, "bentley": null, "berkeley": null, "bitter": null, "bizzarrini": null, "bmw": null, "brilliance": null, "bristol": null, "bugatti": null, "buick": null, "cadillac": null, "caterham": null, "checker": null, "chevrolet": null, "chrysler": null, "citroen": null, "dacia": null, "daewoo": null, "daf": null, "daihatsu": null, "daimler": null, "datsun": null, "de-tomaso": null, "dkw": null, "dodge": null, "donkervoort": null, "eagle": null, "fairthorpe": null, "ferrari": null, "fiat": null, "fisker": null, "ford": null, "gaz": null, "geely": null, "ginetta": null, "gmc": null, "holden": null, "honda": null, "hudson": null, "humber": null, "hummer": null, "hyundai": null, "infiniti": null, "innocenti": null, "isuzu": null, "italdesign": null, "jaguar": null, "jeep": null, "jensen": null, "kia": null, "koenigsegg": null, "lada": null, "lamborghini": null, "lancia": null, "land-rover": null, "lexus": null, "lincoln": null, "lotec": null, "lotus": null, "luxgen": null, "mahindra": null, "marcos": null, "maserati": null, "matra-simca": null, "maybach": null, "mazda": null, "mcc": null, "mclaren": null, "mercedes-benz": null, "mercury": null, "mg": null, "mini": null, "mitsubishi": null, "monteverdi": null, "moretti": null, "morgan": null, "morris": null, "nissan": null, "noble": null, "nsu": null, "oldsmobile": null, "opel": null, "packard": null, "pagani": null, "panoz": null, "peugeot": null, "pininfarina": null, "plymouth": null, "pontiac": null, "porsche": null, "proton": null, "reliant": null, "renault": null, "riley": null, "rolls-royce": null, "rover": null, "saab": null, "saleen": null, "samsung": null, "saturn": null, "scion": null, "seat": null, "simca": null, "singer": null, "skoda": null, "smart": null, "spyker": null, "ssangyong": null, "ssc": null, "steyr": null, "studebaker": null, "subaru": null, "sunbeam": null, "suzuki": null, "talbot": null, "tata": null, "tatra": null, "tesla": null, "toyota": null, "trabant": null, "triumph": null, "tvr": null, "vauxhall": null, "vector": null, "venturi": null, "volkswagen": null, "volvo": null, "wartburg": null, "westfield": null, "willys-overland": null, "xedos": null, "zagato": null, "zastava": null, "zaz": null, "zenvo": null, "zil": null,
     }
   }else{
     list = car_makes_list
   }
    $('.chips').on('chip.add', function(e, chip){
      //DO NOT SAVE AS A CHIP IF TEXT IS NOT CONTAINED IN AUTOCOMPLETE LIST
      if(!(chip.tag in list)){
        for(var key in e.target.children) {
          if(e.target.children.hasOwnProperty(key)){
            if( e.target.children[key].innerText === `${chip.tag}close`){
              e.target.children[key].remove()
            }
          }
        }
      }else{
        selectCarMake(chip)
      }
    });
    $('.chips').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: this.props.selected_car_makes,
      autocompleteOptions: {
        data: list,
        limit: Infinity,
        minLength: 0
      }
    });
    $('.chips').on('chip.delete', function(e, chip){
      removeCarMake(chip)
    });
  }
  componentDidUpdate(){
    //AUTOCOMPLETE
    $('.chips').material_chip();
    $('.chips-autocomplete').material_chip({
      placeholder: 'Marques',
      secondaryPlaceholder: 'Marques',
      data: this.props.selected_car_makes,
      autocompleteOptions: {
        data: this.props.car_makes_list,
        limit: Infinity,
        minLength: 1
      }
    });
  }
  submit(values){
    const { updateCarDomains, updateMecanoProfile, mecano_id, selected_car_makes } = this.props
    if(values.all_vehicles === 'specific_brands'){
      const data = []
      selected_car_makes.map((e)=> data.push({kind: "car_make", value: e.tag}))
      updateMecanoProfile(mecano_id, { "all_vehicles": false }, '/mecano_domains')
      updateCarDomains(mecano_id, {domains: data}, '/mecano_domains')
    }else{
      updateMecanoProfile(mecano_id, { "all_vehicles": true }, '/mecano_domains')
      updateCarDomains(mecano_id, {domains: data}, '/mecano_domains')
    }
  }
  render(){
    const { handleSubmit, specific_vehicles, car_makes_list } = this.props;
    return (
      <div>
        <Header>Enregistrement mécano 2/3</Header>
        <div className="container">
          <form onSubmit={handleSubmit(values => this.submit(values))}>
            <div className="col s12 l6 text-center">
              <h2>Mes domaines de compétences</h2>
              <br/>
            </div>
            <div className="col s12">
              <RadioButtons name="all_vehicles" label="Je travaille sur" options={{"all_vehicles": "tous véhicules", "specific_brands":"certaines marques"}} />
              <br/>
              {
                specific_vehicles ?
                <div className="chips chips-autocomplete input-field" data-index="0" data-initialized="true">
                  <Field id="car_makes" ref="car_makes" name="car_makes" component="input" />
                </div>
                :
                <div style={{ display: 'none' }} className="chips chips-autocomplete input-field" data-index="0" data-initialized="true">
                  <Field id="car_makes" ref="car_makes" name="car_makes" component="input" />
                </div>
              }
              <div className="space-between">
                <div></div>
                <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

VehicleChoice = reduxForm({
  form: 'vehicle_choice'
})(VehicleChoice);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCarMakes, selectCarMake, removeCarMake, updateCarDomains, updateMecanoProfile }, dispatch);
}

function mapStateToProps(state) {
  const { vehicle_choice } = state.form
  return {
    car_makes_list: state.vehicle.car_makes_list,
    selected_car_makes: state.vehicle.selected_car_makes,
    specific_vehicles: (vehicle_choice && vehicle_choice.values && (vehicle_choice.values.all_vehicles === "specific_brands")),
    mecano_id: state.mecano.id
  }
}

VehicleChoice = connect(mapStateToProps, mapDispatchToProps)(VehicleChoice)


export { VehicleChoice };
