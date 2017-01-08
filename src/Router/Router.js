import React from 'react';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import Section from './../Section/Section';
import Root from './../Views/Root';
import CustomActivities from './../Components/customActivities/CustomActivities';

function Devices() {
  return <Section route="Devices" />;
}

function media() {
  return (
    <iframe allowFullScreen width="100%" height="100%" src="http://192.168.1.28:32400/web/index.html" />
  );
}

function AddMovies() {
  return (
    <iframe src="http://192.168.1.24:5050/movies/" />
  );
}

function AddTv() {
  return (
    <iframe src="http://192.168.1.24:8989/" />
  );
}

const AppRouter = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="quick" />
    <Route path="/" component={Root}>
      <Route path="quick" component={CustomActivities} />
      <Route path="media" component={media} />
      <Route path="devices" component={Devices} />
      <Route path="addMovies" component={AddMovies} />
      <Route path="addTv" component={AddTv} />
    </Route>
  </Router>
);

export default AppRouter;
