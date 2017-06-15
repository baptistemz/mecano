import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProtected } from '../actions/index';

class Protected extends Component {
  componentWillMount(){
    // this.props.fetchProtected()
  }
  render() {
    return (
      <div>
        <h1>Mes Infos</h1>
        <p>{this.props.email}</p>
        <p>{this.props.first_name}</p>
        <p>{this.props.last_name}</p>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProtected }, dispatch);
}
function mapStateToProps({ auth }) {
  return {
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Protected);
