import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import command from './../command';
import ServerURL from './../Server';

const MegaPowerOff = () => (
  <RaisedButton primary onClick={() => command(`http://${ServerURL()}/allOff/`)}>
    All Off
  </RaisedButton>
);

export default MegaPowerOff;
