import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import MegaSwitcher from './../Components/MegaSwitcher';
import Section from './../Section/Section';
import command from './../command';

const muiTheme = getMuiTheme({
  palette: {
    // primary1Color: Colors.cyan500,
    // primary2Color: Colors.cyan700,
    // primary3Color: Colors.lightBlack,
    // accent1Color: Colors.pinkA200,
    // accent2Color: Colors.grey100,
    // accent3Color: Colors.grey500,
    // textColor: Colors.darkBlack,
    alternateTextColor: Colors.red500,
    // canvasColor: Colors.red500,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="App">
      <div className="App-header">
        <h2>Geek Haus Enterainment Control</h2>
      </div>

      <MegaSwitcher />

      <Section route="Activities" onSelection={target => command(`http://localhost:5000/Activities/${target}`)} />
      <Section route="Devices" />
    </div>
  </MuiThemeProvider>
);

export default App;
