import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

export default function Channel(props) {
  const controls = _.filter(props.controls, control => control.includes('Channel'));

  if (!controls.length) {
    return null;
  }

  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));
  const defaults = _.extend({}, {
    type: props.type,
    target: props.target,
    buttonType: 'primary'
  });

  return (
    <div className="Controller">
      <h4>Channel</h4>

      {up && (
        <APIButton
          {...defaults}
          command={prepare(up)}
          text="▲"
          className="ChannelUp"
        />
      )}

      {down && (
        <APIButton
          {...defaults}
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
  target: React.PropTypes.string
};
