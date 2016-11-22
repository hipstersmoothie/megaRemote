import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MegaSwitcher from './../Components/MegaSwitcher';
import Section from './../Section/Section';
import command from './../command';
import Root from './../Views/Root';

function Activities() {
  return <Section route="Activities" onSelection={target => command(`http://localhost:5000/Activities/${target}`)} />;
}

function Devices() {
  return <Section route="Devices" />;
}

function All() {
  return (
    <Root>
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
      <Route path="quick" component={MegaSwitcher} />
      <Route path="activities" component={Activities} />
      <Route path="devices" component={Devices} />
    </Route>
  </Router>
);

export default AppRouter;
