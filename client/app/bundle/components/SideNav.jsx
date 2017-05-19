import React from 'react';
import { Link } from 'react-router';
import { Button } from '../common/index'

const SideNav = (props) => {
  return (
    <div>
      <div className="container">
        <h5>Navbar</h5>
        <Link to={'/login'}><Button icon="lock">Login</Button></Link>
        <Link to={'/signup'}><Button>Signup</Button></Link>
      </div>
      { props.children }
    </div>
  );
};

export default SideNav
