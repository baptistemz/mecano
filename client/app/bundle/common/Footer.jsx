import React from 'react';

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="container">
        <h6>Name of the app</h6>
        <hr/>
        <div className="space-between">
          <a>CGU</a>
          <a>Contact</a>
          <a>À propos</a>
          <div className="space-around">
            <a style={{ margin: '0 10px'}}><i className="fa fa-facebook"></i></a>
            <a style={{ margin: '0 10px'}}><i className="fa fa-twitter"></i></a>
            <a style={{ margin: '0 10px'}}><i className="fa fa-envelope"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
