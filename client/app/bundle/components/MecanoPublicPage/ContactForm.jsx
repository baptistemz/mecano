import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Button } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class ContactForm extends Component {
  componentDidMount(){
    // auto-expand textarea when content is bigger than the space let by the area
    $('textarea').keyup(function() {
      const height = parseInt($(this).css('height'), 10)
      if( height + 34 < this.scrollHeight){
        $(this).css('height', `${this.scrollHeight}px`)
      }
    });
  }
  changeProfileField(type, text) {
    const { formatMessage } = this.props.intl
    let data = {};
    data[type] = text;
    const key =  formatMessage(defaultMessages[_.camelCase('user_' + type)])
    this.props.updateProfile(data, `Votre ${key} a bien été mis à jour pour "${text}"`);
    // !!! USEFUL TU WRITE JAVASCRIPT AFTER THIS ACTION, SO THAT DISPATCH FINISHES BEFORE COMPONENT RELOADS
    console.log("ok")
  }
  render(){
    const { formatMessage } = this.props.intl
    return(
      <div>
        <div className="box-shadow white-background marged-20 padded-20">
          <h5 className="capitalize text-center">Contacter ce mécano</h5>
          <div className="direction-row align-center">
            <h6 style={{marginRight: "10px"}}>De:</h6>
            <p>{this.props.email}</p>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">create</i>
            <textarea id="messageText" ref="message" className="materialize-textarea"></textarea>
            <label htmlFor="messageText">Message</label>
          </div>
          <div>
            <Button className= "full-width" icon="mail_outline">Envoyer le message</Button>
          </div>
        </div>
        <div className="box-shadow white-background marged-20 padded-20">
          <p>Une fois votre message envoyé, le mécano vous répondra par email sur l'adresse avec laquelle vous êtes connecté. Vérifiez que cette addresse est correcte. Si nécessaire, modifiez la dans <Link to={'/my_account'}>l'espace "mon compte"</Link></p>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

function mapStateToProps({ mecano_visited, auth }) {
  return {
    mecano_id: mecano_visited.id,
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name
  }
}

ContactForm = connect(mapStateToProps, null)(ContactForm);

export default injectIntl(ContactForm);
