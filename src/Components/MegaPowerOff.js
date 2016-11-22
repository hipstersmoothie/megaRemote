import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import command from './../command';

function MegaPowerOff() {
  // TODO Fix
  return (
    <RaisedButton onClick={() => command(`http://localhost:5000/allOff/${this.props.secondary}`)}>
      All Off
    </RaisedButton>
  );
}

MegaPowerOff.propTypes = {
  secondary: React.PropTypes.bool // eslint-disable-line
};

export default MegaPowerOff;
