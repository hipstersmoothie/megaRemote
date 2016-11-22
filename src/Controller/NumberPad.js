import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

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
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(one)}
            text="1"
            className="Number1"
          />
        )}

        {two && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(two)}
            text="2"
            className="Number2"
          />
        )}

        {three && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(three)}
            text="3"
            className="Number3"
          />
        )}
      </div>
      <div className="MiddleRow">
        {four && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(four)}
            text="4"
            className="Number4"
          />
        )}

        {five && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(five)}
            text="5"
            className="Number5"
          />
        )}

        {six && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(six)}
            text="6"
            className="Number6"
          />
        )}
      </div>
      <div className="BottomRow">
        {seven && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(seven)}
            text="7"
            className="Number7"
          />
        )}

        {eight && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(eight)}
            text="8"
            className="Number8"
          />
        )}

        {nine && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
            command={prepare(nine)}
            text="9"
            className="Number9"
          />
        )}
      </div>
      <div className="BottomRow">
        {zero && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.targat}
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
  targat: React.PropTypes.string
};
