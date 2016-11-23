import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './Loader.css';

const Loader = () => (
  <div className="Loader">
    <CircularProgress size={40} thickness={4} />
  </div>
);

export default Loader;
