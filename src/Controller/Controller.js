import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import Volume from './Volume';
import NumberPad from './NumberPad';
import Navigation from './Navigation';
import Media from './Media';
import InputOutput from './InputOutput';

function Controller(props) {
  return (
    <div className="Controller">
      <h3>Controller</h3>

      <Volume controls={props.controls} {...props} />
      <NumberPad controls={props.controls} {...props} />
      <Navigation controls={props.controls} {...props} />
      <Media controls={props.controls} {...props} />
      <InputOutput controls={props.controls} {...props} />

      <div className="Other-List">
        {_.chain(props.controls)
          .filter(control => !control.includes('Volume') && !control.includes('Mute'))
          .filter(control => !control.includes('NumericBasic') && isNaN(parseInt(control, 10)))
          .filter(control => !control.includes('NavigationBasic') && !control.includes('Direction') && !control.includes('Enter') && !control.includes('Select') && !control.includes('Return'))
          .filter(control => !control.includes('TransportExtended') && !control.includes('TransportBasic') && !control.includes('Play') && !control.includes('Stop') && !control.includes('Pause') && !control.includes('Rewind') && !control.includes('FastForwar') && !control.includes('Skip'))
          .filter(control => !control.includes('Input') && !control.includes('Source') && !control.includes('HdmiOut'))
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
