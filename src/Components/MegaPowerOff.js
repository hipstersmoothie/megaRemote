import React from 'react';
import command from './../command';

function MegaPowerOff() {
  return (
    <button className="Output-button" onClick={() => command(`http://localhost:5000/allOff/${this.props.secondary}`)}>
      All Off
    </button>
  );
}

MegaPowerOff.propTypes = {
  secondary: React.PropTypes.bool // eslint-disable-line
};

export default MegaPowerOff;
