import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';

function prepare(control) {
  return control.join ? control.join(',') : control;
}

function getControl(type, control) {
  const command = prepare(control);
  return command.indexOf(type) > -1;
}

export default function Power(props) {
  const controls = _.filter(props.controls, control => control.includes('Power'));

  if (!controls.length) {
    return null;
  }

  const on = _.find(controls, _.partial(getControl, 'On'));
  const off = _.find(controls, _.partial(getControl, 'Off'));
  const toggle = _.find(controls, _.partial(getControl, 'Toggle'));

  return (
    <div className="Controller">
      <h4>Power</h4>

      {on && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(on)}
          text="🌕"
          className="PowerOn"
        />
      )}

      {off && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(off)}
          text="🌑"
          className="PowerOff"
        />
      )}

      {toggle && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(toggle)}
          text="🌗"
          className="PowerToggle"
        />
      )}
    </div>
  );
}

Power.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
