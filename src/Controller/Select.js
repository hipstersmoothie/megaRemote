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
            buttonType="primary"
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
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(left)}
            text="◀"
            className="NavigationDown"
          />
        )}
        {select && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(select)}
            text="⦿"
            className="NavigationSelect"
          />
        )}
        {right && (
          <APIButton
            buttonType="primary"
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
            buttonType="primary"
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

Select.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
