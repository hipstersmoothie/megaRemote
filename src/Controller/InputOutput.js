import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare } from './helpers';

function pretty(control) {
  return control.replace('Input', '').replace('HdmiOut', '');
}

export default function InputOutput(props) {
  const inputs = _.filter(props.controls, control => control.includes('Input') || (control.includes('Source') && !control.includes('Source Power')));
  const outputs = _.filter(props.controls, control => control.includes('HdmiOut'));
  const mode = _.filter(props.controls, control => control.includes('Mode'));

  if (!inputs.length) {
    return null;
  }

  return (
    <div className="Controller">
      <h4>Inputs/Outputs</h4>

      <div className="List">
        {_.map(inputs, control =>
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Input"
            key={control}
          />
        )}

        {_.map(outputs, control =>
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Output"
            key={control}
          />
        )}

        {_.map(mode, control =>
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Mode"
            key={control}
          />
        )}
      </div>
    </div>
  );
}

InputOutput.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  device: React.PropTypes.string
};
