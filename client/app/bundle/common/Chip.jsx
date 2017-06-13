import React from 'react';

const Chip = ({ children, onClose }) => {
  return (
    <div className="chip">
      {children}
      <i className="close material-icons" onClick={(e)=> onClose(e)}>close</i>
    </div>
  );
};

export { Chip };
