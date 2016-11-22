import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

export default function Power(props) {
  const controls = _.filter(props.controls, control => control.includes('Power'));

  if (!controls.length) {
    return null;
  }

  const on = _.find(controls, _.partial(getControl, 'On'));
  const off = _.find(controls, _.partial(getControl, 'Off'));
  const toggle = _.find(controls, _.partial(getControl, 'Toggle'));
  const source = _.find(controls, _.partial(getControl, 'Source'));

  return (
    <div className="Controller">
      <h4>Power</h4>

      {on && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.target}
          command={prepare(on)}
          text="🌕"
          className="PowerOn"
        />
      )}

      {off && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.target}
          command={prepare(off)}
          text="🌑"
          className="PowerOff"
        />
      )}

      {toggle && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.target}
          command={prepare(toggle)}
          text="🌗"
          className="PowerToggle"
        />
      )}

      {source && (
        <APIButton
          buttonType="primary"
          type={props.type}
          target={props.target}
          command={prepare(source)}
          text="S🌗"
          className="PowerToggleSource"
        />
      )}
    </div>
  );
}

Power.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  target: React.PropTypes.string
};
