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

export default function NumberPad(props) {
  const controls = _.filter(props.controls, control => control.includes('NumericBasic') || !isNaN(parseInt(control, 10)));

  if (!controls.length) {
    return null;
  }

  const zero = _.find(controls, _.partial(getControl, '0'));
  const one = _.find(controls, _.partial(getControl, '1'));
  const two = _.find(controls, _.partial(getControl, '2'));
  const three = _.find(controls, _.partial(getControl, '3'));
  const four = _.find(controls, _.partial(getControl, '4'));
  const five = _.find(controls, _.partial(getControl, '5'));
  const six = _.find(controls, _.partial(getControl, '6'));
  const seven = _.find(controls, _.partial(getControl, '7'));
  const eight = _.find(controls, _.partial(getControl, '8'));
  const nine = _.find(controls, _.partial(getControl, '9'));

  return (
    <div className="Controller">
      <h4>#</h4>

      <div className="TopRow">
        {one && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(one)}
            text="1"
            className="Number1"
          />
        )}

        {two && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(two)}
            text="2"
            className="Number2"
          />
        )}

        {three && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(three)}
            text="3"
            className="Number3"
          />
        )}
      </div>
      <div className="MiddleRow">
        {four && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(four)}
            text="4"
            className="Number4"
          />
        )}

        {five && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(five)}
            text="5"
            className="Number5"
          />
        )}

        {six && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(six)}
            text="6"
            className="Number6"
          />
        )}
      </div>
      <div className="BottomRow">
        {seven && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(seven)}
            text="7"
            className="Number7"
          />
        )}

        {eight && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(eight)}
            text="8"
            className="Number8"
          />
        )}

        {nine && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(nine)}
            text="9"
            className="Number9"
          />
        )}
      </div>
      <div className="BottomRow">
        {zero && (
          <APIButton
            type={props.type}
            target={props.device}
            command={prepare(zero)}
            text="0"
            className="Number0"
          />
        )}
      </div>
    </div>
  );
}

NumberPad.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
