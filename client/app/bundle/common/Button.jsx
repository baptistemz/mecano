import React from 'react';

const Button = (props) => {
  return (
    <a className="waves-effect waves-light btn">
      <i className="material-icons left">{ props.icon }</i>
      { props.children }
    </a>
  );
};

export { Button };
