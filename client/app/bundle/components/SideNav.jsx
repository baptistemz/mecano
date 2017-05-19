import React from 'react';
import { Button } from '../common/index'

const SideNav = (props) => {
  return (
    <div className="container">
      <h5>Navbar</h5>
      <Button icon="lock">Login</Button>
      <Button>Signup</Button>
    </div>
  );
};

export default SideNav
