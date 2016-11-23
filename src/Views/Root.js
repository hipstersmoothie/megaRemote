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
    accent1Color: Colors.pinkA200,
    alternateTextColor: Colors.cyan500
  },
});

injectTapEventPlugin();

const Root = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className="App">
      <Header />

      <div className="App-Content">
        {props.children}
      </div>

      <BottomNav className="App-Footer" location={props.location && props.location.pathname} />
    </div>
  </MuiThemeProvider>
);

Root.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object
};

export default Root;
