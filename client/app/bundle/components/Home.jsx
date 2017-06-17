import React from 'react';
import { Header } from '../common/index';

const Home = (props) => {
  return (
    <div>
      <Header h2={true}>Vroomate</Header>
      <div className="container">
        <h1 id="name-of-the-app">Vroomate</h1>
      </div>
    </div>
  );
};

export default Home;
