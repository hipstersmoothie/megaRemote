import React from 'react';

import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './Root.css';
import Header from './Header';
import BottomNav from './BottomNav';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.red500,
    primary2Color: Colors.red700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.cyan500,
    // canvasColor: Colors.red500,
  },
});

injectTapEventPlugin();

const App = props => {
  console.log(props)
  return <MuiThemeProvider muiTheme={muiTheme}>
    <div className="App">
      <Header />

      <div className="App-Content">
        {props.children}
      </div>

      <BottomNav className="App-Footer" location={props.location.pathname}/>
    </div>
  </MuiThemeProvider>
};

App.propTypes = {
  children: React.PropTypes.object
};

export default App;
