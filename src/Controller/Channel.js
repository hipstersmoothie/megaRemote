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

export default function Channel(props) {
  const controls = _.filter(props.controls, control => control.includes('Channel'));

  if (!controls.length) {
    return null;
  }

  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));

  return (
    <div className="Controller">
      <h4>Channel</h4>

      {up && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(up)}
          text="▲"
          className="ChannelUp"
        />
      )}

      {down && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(down)}
          text="▼"
          className="ChannelDown"
        />
      )}
    </div>
  );
}

Channel.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
