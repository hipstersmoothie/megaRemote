import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare } from './helpers';

export default function Navigation(props) {
  const controls = _.filter(props.controls, control => control.includes('Return') || control.includes('Menu')
    || control.includes('Search') || control.includes('Setup') || control.includes('Display')
    || control.includes('Back') || control.includes('Home') || control.includes('Clear')
    || control.includes('Eject') || control.includes('Info') || control.includes('Guide')
    || control.includes('Exit') || control.includes('SmartHub') || control.includes('Tools'));

  if (!controls.length) {
    return null;
  }

  return (
    <div className="Controller">
      <h4>Navigation</h4>

      <div className="List">
        {_.map(controls, control =>
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(control)}
            className="Navigation"
            key={control}
          />
        )}
      </div>
    </div>
  );
}

Navigation.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  device: React.PropTypes.string
};
