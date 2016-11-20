import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';

function prepare(control) {
  return control.join ? control.join(',') : control;
}

function pretty(control) {
  return control.replace('Input', '').replace('HdmiOut', '');
}

export default function InputOutput(props) {
  const inputs = _.filter(props.controls, control => control.includes('Input') || control.includes('Source'));
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
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Input"
          />
        )}

        {_.map(outputs, control =>
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Output"
          />
        )}

        {_.map(mode, control =>
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(control)}
            text={pretty(control)}
            className="Mode"
          />
        )}
      </div>
    </div>
  );
}

InputOutput.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
