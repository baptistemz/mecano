import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, initialize } from 'redux-form';
import domains from '../../utils/domains.js';
import { updateTechnicalDomains } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

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
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;
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

DomainEdit = injectIntl(connect(mapStateToProps, mapDispatchToProps)(DomainEdit));

export { DomainEdit };
