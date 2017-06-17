import React from 'react';

const Header = ({ h2, children }) => {
  return (
    <div className="header-bar">
      {h2 ? <h2 className="header-title">{ children }</h2> : <h1 className="header-title">{ children }</h1>}
    </div>
  );
};

export { Header };
