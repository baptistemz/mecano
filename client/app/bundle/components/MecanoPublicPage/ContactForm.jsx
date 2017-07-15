import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { Button } from '../../common/index';
import { contact, createVehicle } from '../../actions/index';
import carQueryConfig from '../../utils/carQueryConfig';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class ContactForm extends Component {
  constructor(props){
    super(props)
    this.state = { newVehicle: !props.vehicle}
  }
  componentDidMount(){
    // auto-expand textarea when content is bigger than the space let by the area
    $('textarea').keyup(function() {
      const height = parseInt($(this).css('height'), 10)
      if( height + 39 < this.scrollHeight){
        $(this).css('height', `${this.scrollHeight}px`)
      }
    });
  }
  componentDidUpdate(){
    carQueryConfig()
  }
  submitMessage(){
    const { vehicle, mecano_visited_id, contact, createVehicle } = this.props;
    if(this.state.newVehicle){
      const {year, brand, model_select, model_string, model_not_found } = this.refs
      let trim = this.refs.trim.childNodes[0].innerHTML
      trim = (trim === "None" || model_not_found.checked) ? "" : trim;
      const model = model_not_found.checked ? model_string.value : model_select.value
      createVehicle({year: year.value, brand: brand.value, model , trim })
    }else if(!vehicle.id){
      createVehicle(vehicle)
    }else{
      contact({ first_message: this.refs.message.value, mecano_visited_id, vehicle_id: vehicle.id });
    }
  }
  componentWillReceiveProps(newProps){
    const { vehicle, mecano_visited_id, contact, createVehicle } = this.props;
    if(vehicle !== newProps.vehicle){
      contact({ first_message: this.refs.message.value, mecano_visited_id, vehicle_id: newProps.vehicle.id });
    }
  }
  manageInputs(){
    if(this.refs.model_not_found.checked){
      $('#model-select-group').css('display', 'none')
      $('#model-string-group').css('display', 'block')
    }else{
      $('#model-select-group').css('display', 'block')
      $('#model-string-group').css('display', 'none')
    }
  }
  vehicleFields(){
    return(
      <div>
        <div className="row">
          <div className="col s12 m6 l3">
            <label htmlFor="year">Année</label>
            <select name="year" ref="year" id="year" />
          </div>
          <div className="col s12 m6 l3">
            <label htmlFor="brand">Contructeur</label>
            <select name="brand" ref="brand" id="brand" />
          </div>
          <div id="model-select-group">
            <div className="col s12 m6 l3">
              <label htmlFor="model_select">Modèle</label>
              <select name="model_select" ref="model_select" id="model_select" />
            </div>
            <div className="col s12 m6 l3">
              <label htmlFor="trim">Extension</label>
              <select name="trim" ref="trim" id="trim" />
            </div>
          </div>
          <div id="model-string-group">
            <div className="col s12 m12 l6">
              <label htmlFor="model_string">Modèle</label>
              <input style={{ margin: 0 }} name="model_string" ref="model_string" id="model_string" />
            </div>
          </div>
          <div className="col offset-l6 s12 l6">
            <p>
              <input type="checkbox" ref="model_not_found" id="model-not-found" onChange={() => this.manageInputs()} />
              <label htmlFor="model-not-found">Je ne trouve pas mon modèle.</label>
            </p>
          </div>
        </div>
      </div>
    );

  }
  render(){
    const { location, intl, email, vehicle, isContacted, user_mecano_id, mecano_visited_id } = this.props;
    const { formatMessage } = intl;
    if(isContacted){
      toastr.info("Vous avez contacté cet utilisateur");
      return <Redirect to={location.pathname.replace("/contact", "")}/>
    }
    if(user_mecano_id === mecano_visited_id){
      toastr.info("Vous ne pouvez pas vous contacter vous-même via restor'it");
      return <Redirect to={location.pathname.replace("/contact", "")}/>
    }
    return(
      <div>
        <div className="box-shadow white-background marged-20 padded-20">
          <p>Une fois votre message envoyé, le mécano vous répondra par email sur l'adresse avec laquelle vous êtes connecté. Vérifiez que cette addresse est correcte. Si nécessaire, modifiez-la dans <Link to={{ pathname: '/my_account', state: { from: this.props.location, redirected: true } }}>l'espace "mon compte"</Link></p>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="capitalize text-center">Contacter ce mécano</h5>
          <div className="direction-row align-center">
            <h6 style={{marginRight: "5px", marginBottom: "5px"}}>De :</h6>
            <p>{email}</p>
          </div>
          <div className={this.state.newVehicle ? "" : "direction-row align-center"}>
            <h6 style={{marginRight: "5px", marginBottom: "5px"}}>Véhicule :</h6>
            {
              this.state.newVehicle ?
                this.vehicleFields()
              :
                <div>
                  <p>{vehicle.brand} {vehicle.model} {vehicle.trim} de {vehicle.year}</p>
                  <div className="btn btn-small" onClick={() =>{
                      this.setState({newVehicle: true})
                    }}>Choisir un autre véhicule</div>
                </div>
            }
          </div>

          <div className="input-field">
            <i className="material-icons prefix">create</i>
            <textarea id="messageText" ref="message" className="materialize-textarea"></textarea>
            <label htmlFor="messageText">Message</label>
          </div>
          <div>
            <Button clickTrigger={() => this.submitMessage()} className= "full-width" icon="mail_outline">Envoyer le message</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ contact, createVehicle }, dispatch);
}

function mapStateToProps({ mecano_visited, mecano, auth, search }) {
  return {
    mecano_visited_id: mecano_visited.id,
    user_mecano_id: mecano.id,
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name,
    vehicle: search.vehicle,
    isContacted: mecano_visited.contacted
  }
}

ContactForm = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ContactForm))

export { ContactForm }
