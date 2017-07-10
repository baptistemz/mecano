import React from 'react';

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="container">
        <h6>Name of the app</h6>
        <hr/>
        <div style={{margin: '0 -20px'}} className="space-between">
          <a>CGU</a>
          <a className="hide-on-small-only">Contact</a>
          <div className="space-around social-links">
            <a><i className="fa fa-facebook"></i></a>
            <a><i className="fa fa-twitter"></i></a>
            <a><i className="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
