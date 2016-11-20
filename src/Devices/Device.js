import React from 'react';

import './Devices.css';
import APIButton from './../Components/APIButton';

function Device(props) {
  let className = 'Device';

  if (props.device === props.current) {
    className = 'SelectedDevice';
  }

  return <APIButton className={className} command={props.device} {...props} />;
}

Device.propTypes = {
  current: React.PropTypes.string,
  device: React.PropTypes.string
};

export default Device;
