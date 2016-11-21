import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

export default function Volume(props) {
  const controls = _.filter(props.controls, control => control.includes('Volume') || control.includes('Mute'));

  if (!controls.length) {
    return null;
  }

  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));
  const mute = _.find(controls, _.partial(getControl, 'Mute'));

  return (
    <div className="Controller">
      <h4>Volume</h4>

      {up && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.device}
          command={prepare(up)}
          text="▲"
          className="VolumeUp"
        />
      )}

      {down && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.device}
          command={prepare(down)}
          text="▼"
          className="VolumeDown"
        />
      )}

      {mute && (
        <APIButton
          buttonType="primary"
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

Volume.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
