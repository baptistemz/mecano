import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PictureUpdate from './PictureUpdate';
import { Header, EditableField } from '../common/index';
import { updateProfile } from '../actions/index';

class Account extends Component {
  changeProfileField(type, text) {
    const data = {};
    data[type] = text;
    console.log(data)
    this.props.updateProfile(data);
  }
  render() {
    const { first_name, last_name, email } = this.props;
    return (
      <div>
        <Header>Mon compte</Header>
        <div className="container">
          <h2>Mes informations personnelles</h2>
          <EditableField
            type="first_name"
            onSubmit={this.changeProfileField.bind(this)}
            value={first_name}
          />
          <EditableField
            type="last_name"
            onSubmit={this.changeProfileField.bind(this)}
            value={last_name}
          />
          <EditableField
            type="email"
            onSubmit={this.changeProfileField.bind(this)}
            value={email}
          />
          <PictureUpdate />
          <h2>Mes véhicules</h2>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProfile }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    email: auth.email,
    first_name: auth.first_name,
    last_name: auth.last_name
  }
}

export default connect(mapStateToProps,  mapDispatchToProps)(Account);
