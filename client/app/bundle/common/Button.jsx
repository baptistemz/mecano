import React from 'react';

const Button = (props) => {
  return (
    <button type={props.type} className="waves-effect waves-light btn">
      <i className="material-icons left">{ props.icon }</i>
      { props.children }
    </button>
  );
};

export { Button };
