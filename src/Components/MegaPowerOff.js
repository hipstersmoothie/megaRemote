import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import command from './../command';
import ServerURL from './../Server';

const MegaPowerOff = props => (
  <RaisedButton primary onClick={() => command(`http://${ServerURL()}/allOff/${props.secondary}`)}>
    All Off
  </RaisedButton>
);

MegaPowerOff.propTypes = {
  secondary: React.PropTypes.bool // eslint-disable-line
};

export default MegaPowerOff;
