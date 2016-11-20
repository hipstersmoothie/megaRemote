import React from 'react';

import './App.css';
import Activities from './../Activities/Activities';
import Devices from './../Devices/Devices';
import MegaPowerOff from './../Components/MegaPowerOff';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Geek Haus Enterainment Control</h2>
      </div>
      <MegaPowerOff />
      <Activities />
      <Devices />
    </div>
  );
}

export default App;
