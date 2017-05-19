import React from 'react';

const Button = (props) => {
  return (
    <div className="waves-effect waves-light btn">
      <i className="material-icons left">{ props.icon }</i>
      { props.children }
    </div>
  );
};

export { Button };
