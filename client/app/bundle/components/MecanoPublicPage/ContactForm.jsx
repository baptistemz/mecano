import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from '../../common/index';
import { contact, createVehicle } from '../../actions/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class ContactForm extends Component {
  componentDidMount(){
    // auto-expand textarea when content is bigger than the space let by the area
    $('textarea').keyup(function() {
      const height = parseInt($(this).css('height'), 10)
      if( height + 39 < this.scrollHeight){
        $(this).css('height', `${this.scrollHeight}px`)
      }
    });
  }
  submitMessage(){
    const { vehicle, mecano_profile_id, contact, createVehicle } = this.props;
    if(!vehicle.id){
      createVehicle(vehicle)
    }else{
      contact({ first_message: this.refs.message.value, mecano_profile_id, vehicle_id: vehicle.id });
    }
  }
  componentWillReceiveProps(newProps){
    const { vehicle, mecano_profile_id, contact, createVehicle } = this.props;
    if((vehicle && !vehicle.id) && newProps.vehicle.id){
      contact({ first_message: this.refs.message.value, mecano_profile_id, vehicle_id: newProps.vehicle.id });
    }
  }
  render(){
    const { intl, email, vehicle } = this.props;
    const { formatMessage } = intl;
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
          <div className="direction-row align-center">
            <h6 style={{marginRight: "5px", marginBottom: "5px"}}>Véhicule :</h6>
            <p>{vehicle.brand} {vehicle.model} {vehicle.trim} de {vehicle.year}</p>
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

function mapStateToProps({ mecano_visited, auth, search }) {
  return {
    mecano_profile_id: mecano_visited.id,
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name,
    vehicle: search.vehicle
  }
}

ContactForm = connect(mapStateToProps, mapDispatchToProps)(ContactForm);

export default injectIntl(ContactForm);
