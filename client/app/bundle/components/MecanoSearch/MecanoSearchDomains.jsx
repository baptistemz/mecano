import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { addDomainsToSearch } from '../../actions/index';
import { Header, SelectableCard } from '../../common/index';
import domains from '../../utils/domains.js';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoSearchDomains extends Component {
  submit(values){
    const { addDomainsToSearch, mecano_profile } = this.props;
    const data = []
    Object.keys(values).map((k)=> {if(values[k] === true){data.push(k)}});
    addDomainsToSearch(data)
  }
  render(){
    const { formatMessage } = this.props.intl;
    const { handleSubmit } = this.props
    return (
      <div className="boxes-background">
        <Header>Recherche mécano 2/2</Header>
        <div className="container">
          <div className="row">
            <div className="col s12 text-center">
              <h2>Compétences recherchées</h2>
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
              <Link to={'/mecano_search'} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_left</i></Link>
              <a onClick={handleSubmit(values => this.submit(values))} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addDomainsToSearch }, dispatch);
}

function mapStateToProps(state) {
  const initialValues= {}
  state.search.domains.map((domain)=>{initialValues[domain] = true})
  return {
    mecano_profile: state.mecano.mecano_profile,
    initialValues
  }
}

MecanoSearchDomains = reduxForm({
  form: 'domain_search'
})(MecanoSearchDomains);

MecanoSearchDomains = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoSearchDomains));

export { MecanoSearchDomains };
