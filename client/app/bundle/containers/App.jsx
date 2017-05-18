import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateName } from '../actions/index';
import configureStore from '../store/configureStore';

const store = configureStore();

class App extends React.Component {
  onChange = (name) => {
    this.props.updateName(name);
  };
  render() {
    return (
      <div>
        <h3>
          Hello, {this.props.name}!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.props.name}
            onChange={(e) => this.onChange(e.target.value)}
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateName }, dispatch);
}

function mapStateToProps({ name }) {
  return { name: name.value };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
