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

export default function VolumeControls(props) {
  const controls = _.filter(props.controls, control => control.includes('Volume') || control.includes('Mute'));
  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));
  const mute = _.find(controls, _.partial(getControl, 'Mute'));

  if (!up && !down && !mute) {
    return null;
  }

  return (
    <div className="Controller">
      <h4>Volume</h4>

      {up && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(up)}
          text="▲"
          className="VolumeUp"
        />
      )}

      {down && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(down)}
          text="▼"
          className="VolumeDown"
        />
      )}

      {mute && (
        <APIButton
          type={props.type}
          target={props.device}
          command={prepare(mute)}
          text="🔇"
          className="VolumeMute"
        />
      )}
    </div>
  );
}

VolumeControls.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
