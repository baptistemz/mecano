import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { reduxForm, change, Field } from 'redux-form';
import Rater from 'react-rater';
import { changeMark, postReview } from '../../actions/index';
import { Button, RadioButtons, Input } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class Review extends Component {
  componentDidMount(){
    $('textarea').keyup(function() {
      const height = parseInt($(this).css('height'), 10)
      if( height + 39 < this.scrollHeight){
        $(this).css('height', `${this.scrollHeight}px`)
      }
    });
    $('#commentText').characterCounter();
    const { location, dispatch } = this.props
    if(location.state){
      dispatch(change("mecano_review", "status", location.state.status));
    }
  }
  submit(values){
    values.status === 'finished' ? delete values['cancel_reason'] : delete values['amount'];
    values['comment'] = this.refs.comment.value;
    values['mark'] = this.props.mark;
    this.props.postReview(this.props.id, values);
  }
  render(){
    const { display_name, isContacted, handleSubmit, finished, mark, changeMark } = this.props;
    const { formatMessage } = this.props.intl
    if(!isContacted){
      return <Redirect to={location.pathname.replace("/review", "")}/>
    }
    return (
      <div className="box-shadow white-background marged-20 padded-20">
        <div className="text-center">
          <h2>Retour</h2>
        </div>
        <br/>
        <div className="text-center">
          <h5>À propos du service</h5>
        </div>
        <form onSubmit={handleSubmit(values => this.submit(values))}>
          <RadioButtons name="status" label="Le service a été" options={{ "finished": "Effectué", "canceled": "Annulé" }} />
          {finished ?
            (
              <div>
                <br/>
                <div className='justify-center'>
                  <Input icon="monetization_on" name="amount" label="Montant facturé*" type="number" />
                  <span className="price-unit">€</span>
                </div>
                <div className="text-center">
                  <div className="grey-text">* Cette information restera entièrement confidentielle</div>
                </div>
                <br/>
              </div>
            )
          :
            <Input icon="edit" name="cancel_reason" label="Cause de l'annulation" type="text" />
          }
          <br/>
          <div className="text-center">
            <h5>Notez {display_name}</h5>
          </div>
          <div className="big-stars">
            <Rater rating={mark} onRate={(e)=> changeMark(e.rating)} />
          </div>
          <div className="input-field">
            <textarea id="commentText" ref="comment" className="materialize-textarea" data-length={200}></textarea>
            <label htmlFor="commentText">Votre avis sur {display_name}</label>
          </div>
          <br/>
          <div className="full-width justify-center">
            <Button onClick={handleSubmit(values => this.submit(values))} icon="playlist_add_check">Valider</Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeMark, postReview }, dispatch);
}

function mapStateToProps(state) {
  const { mecano_review } = state.form
  return {
    id: state.mecano_visited.id,
    display_name: state.mecano_visited.display_name,
    isContacted: state.mecano_visited.contacted,
    isAuthenticated: state.auth.isAuthenticated,
    finished: (mecano_review && mecano_review.values && (mecano_review.values.status === "finished")),
    mark: state.review.mark
  }
}

Review = reduxForm({
  form: 'mecano_review'
})(connect(mapStateToProps, mapDispatchToProps)(Review));

Review = injectIntl(Review)

export { Review }
