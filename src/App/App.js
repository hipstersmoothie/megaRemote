import React from 'react';

import './App.css';
import Activities from './../Activities/Activities';
import Devices from './../Devices/Devices';
import MegaSwitcher from './../Components/MegaSwitcher';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Geek Haus Enterainment Control</h2>
      </div>

      <MegaSwitcher />
      <Activities />
      <Devices />
    </div>
  );
}

export default App;
