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
  const controls = _.filter(props.controls, control => control.includes('NavigationBasic') || control.includes('Direction') || control.includes('Enter') || control.includes('Select') || control.includes('Return'));
  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));
  const left = _.find(controls, _.partial(getControl, 'Left'));
  const right = _.find(controls, _.partial(getControl, 'Right'));
  const select = _.find(controls, _.partial(getControl, 'Select')) || _.find(controls, _.partial(getControl, 'Enter')) || _.find(controls, _.partial(getControl, 'Return'));
  // if (!up && !down && !mute) {
  //   return null;
  // }

  return (
    <div className="Controller">
      <h4>Select</h4>

      <div className="TopRow">
        {up && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(up)}
            text="▲"
            className="NavigationUp"
          />
        )}
      </div>

      <div className="MiddleRow">
        {left && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(left)}
            text="◀"
            className="NavigationDown"
          />
        )}
        {select && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(select)}
            text="⦿"
            className="NavigationSelect"
          />
        )}
        {right && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(right)}
            text="▶"
            className="NavigationDown"
          />
        )}
      </div>

      <div className="BottomRow">
        {down && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(down)}
            text="▼"
            className="NavigationDown"
          />
        )}
      </div>
    </div>
  );
}

VolumeControls.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
