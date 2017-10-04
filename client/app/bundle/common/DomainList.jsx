import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { recommend, unrecommend } from '../actions/index';
import { DomainListItem } from './index'
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../libs/i18n/default';

class DomainList extends Component {
  render(){
    const { domains, kind, isAuthenticated, ownProfile } = this.props;
    const { formatMessage } = this.props.intl
    return(
      <ul className="collection simple-field-collection">
        {domains.map((domain)=>{
          const { id, value, recommendation_number, recommended } = domain;
          let key = kind === "technical_skills" ? _.camelCase('mecano_technical_skills_' + value) : "";
          const text = (kind === "technical_skills") ? formatMessage(defaultMessages[key]) : value
          return <DomainListItem
            key={id}
            text={text}
            id={id}
            recommend={() => this.props.recommend(id)}
            unrecommend={() => this.props.unrecommend(id)}
            recommended={recommended}
            recommendationNumber={recommendation_number}
            isAuthenticated={isAuthenticated}
            recommendBtn={ ownProfile } />
        })}
      </ul>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ recommend, unrecommend }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated
  }
}

DomainList = injectIntl(connect(mapStateToProps, mapDispatchToProps)(DomainList))

export { DomainList }
