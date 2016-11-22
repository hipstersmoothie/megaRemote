import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

export default function Select(props) {
  const controls = _.filter(props.controls, control => control.includes('NavigationBasic') || control.includes('Direction') || control.includes('Enter') || control.includes('Select') || control.includes('OK'));

  if (!controls.length) {
    return null;
  }

  const up = _.find(controls, _.partial(getControl, 'Up'));
  const down = _.find(controls, _.partial(getControl, 'Down'));
  const left = _.find(controls, _.partial(getControl, 'Left'));
  const right = _.find(controls, _.partial(getControl, 'Right'));
  const select = _.find(controls, _.partial(getControl, 'Select')) || _.find(controls, _.partial(getControl, 'Enter')) || _.find(controls, _.partial(getControl, 'OK'));

  return (
    <div className="Controller">
      <h4>Select</h4>

      <div className="TopRow">
        {up && (
          <APIButton
            type={props.type}
            target={props.target}
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
            target={props.target}
            command={prepare(left)}
            text="◀"
            className="NavigationDown"
          />
        )}
        {select && (
          <APIButton
            type={props.type}
            target={props.target}
            command={prepare(select)}
            text="⦿"
            className="NavigationSelect"
          />
        )}
        {right && (
          <APIButton
            type={props.type}
            target={props.target}
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
            target={props.target}
            command={prepare(down)}
            text="▼"
            className="NavigationDown"
          />
        )}
      </div>
    </div>
  );
}

Select.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  target: React.PropTypes.string
};
