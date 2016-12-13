import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import Section from './../Section/Section';
import Root from './../Views/Root';
import CustomActivities from './../Components/customActivities/CustomActivities';

function Devices() {
  return <Section route="Devices" />;
}

function tvShows() {
  return (
    <iframe src="http://192.168.1.24:32400/web/index.html" />
  );
}

const AppRouter = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="quick" />
    <Route path="/" component={Root}>
      <Route path="quick" component={CustomActivities} />
      <Route path="tvShows" component={tvShows} />
      <Route path="devices" component={Devices} />
    </Route>
  </Router>
);

export default AppRouter;
