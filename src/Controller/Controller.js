import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import Volume from './Volume';
import NumberPad from './NumberPad';
import Navigation from './Navigation';

function Controller(props) {
  return (
    <div className="Controller">
      <h3>Controller</h3>

      <Volume controls={props.controls} {...props} />
      <NumberPad controls={props.controls} {...props} />
      <Navigation controls={props.controls} {...props} />

      <div className="Device-list">
        {_.chain(props.controls)
          .filter(control => !control.includes('Volume') && !control.includes('Mute'))
          .filter(control => !control.includes('NumericBasic') && isNaN(parseInt(control, 10)))
          .filter(control => !control.includes('NavigationBasic') && !control.includes('Direction') && !control.includes('Enter') && !control.includes('Select') && !control.includes('Return'))
          .map((control) => {
            const command = control.join ? control.join(',') : control;

            return <APIButton type={props.type} target={props.device} command={command} className="Device" key={control} />;
          })
          .value()
        }
      </div>
    </div>
  );
}

Controller.propTypes = {
  controls: React.PropTypes.array,
  device: React.PropTypes.string,
};

export default Controller;
