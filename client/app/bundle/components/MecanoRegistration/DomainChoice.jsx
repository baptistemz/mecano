import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import domains from '../../utils/domains.js';
import { updateTechnicalDomains } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';
import { injectIntl } from 'react-intl';
import { formatDomainDataForSubmit } from '../../utils/mecanoRegistrationUtils'
import { defaultMessages } from '../../../libs/i18n/default';

class DomainChoice extends Component {
  submit(values){
    const { updateTechnicalDomains, mecano_id } = this.props;
    const data = formatDomainDataForSubmit(values);
    updateTechnicalDomains(mecano_id, {domains: data}, '/mecano_profile');
  }
  render(){
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Header>{formatMessage(defaultMessages.headersMecanoRegistration3)}</Header>
        <div className="container">
          <div className="row">
            <div className="col s12 text-center">
              <h2>{formatMessage(defaultMessages.mecanoRegistrationMyDomains)}</h2>
            </div>
            <br/>
            <form onSubmit={handleSubmit(values => this.submit(values))}>
              { Object.keys(domains).map((d)=> {
                let key = _.camelCase('mecano_technical_skills_' + d);
                return <SelectableCard key={d} value={d} picture={`/domains/${d}.jpg`} tags={domains[d]}>{ formatMessage(defaultMessages[key]) }</SelectableCard>
              })}
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
  return bindActionCreators({ updateTechnicalDomains }, dispatch);
}

function mapStateToProps(state) {
  return {
    mecano_id: state.mecano.id
  }
}

DomainChoice = injectIntl(connect(mapStateToProps, mapDispatchToProps)(DomainChoice));

export { DomainChoice };
