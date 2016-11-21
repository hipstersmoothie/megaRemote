import React from 'react';

import './Devices.css';
import APIButton from './../Components/APIButton';

function Device(props) {
  let buttonType = 'primary';

  if (props.device === props.current) {
    buttonType = 'secondary';
  }

  return <APIButton buttonType={buttonType} className="Device" command={props.device} {...props} />;
}

Device.propTypes = {
  current: React.PropTypes.string,
  device: React.PropTypes.string
};

export default Device;
