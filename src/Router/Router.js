import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MasterVolume from './../Components/MasterVolume/MasterVolume';
import MegaSwitcher from './../Components/MegaSwitcher/MegaSwitcher';
import Section from './../Section/Section';
import command from './../command';
import Root from './../Views/Root';

function Quick() {
  return (
    <div>
      <MasterVolume />
      <MegaSwitcher />
    </div>
  );
}

function Activities() {
  return <Section route="Activities" onSelection={target => command(`http://localhost:5000/Activities/${target}`)} />;
}

function Devices() {
  return <Section route="Devices" />;
}

function All() {
  return (
    <Root>
      <MasterVolume />
      <MegaSwitcher />
      <Activities />
      <Devices />
    </Root>
  );
}

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={All} />
    <Route path="/" component={Root}>
      <Route path="quick" component={Quick} />
      <Route path="activities" component={Activities} />
      <Route path="devices" component={Devices} />
    </Route>
  </Router>
);

export default AppRouter;
