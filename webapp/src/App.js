import React from 'react';
import './App.css';
import Terminal from './Terminal';
import { welcomeMessage } from './welcome';
const App = () => {
  return (
    <div className='App'>
      <Terminal introMessage={welcomeMessage} />
    </div>
  );
};

export default App;
