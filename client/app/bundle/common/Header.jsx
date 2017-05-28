import React from 'react';

const Header = ({ children }) => {
  return (
    <div className="header-bar">
      <h1 className="header-title">{ children }</h1>
    </div>
  );
};

export { Header };
