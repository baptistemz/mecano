import React from 'react';

const Button = ({ type, fullWidth, children, icon, clickTrigger }) => {
  return (
    <button onClick={clickTrigger} type={ type } className={`waves-effect waves-light btn ${fullWidth ? 'full-width' : ''}`}>
      <i className="material-icons left">{ icon }</i>
      { children }
    </button>
  );
};

export { Button };
