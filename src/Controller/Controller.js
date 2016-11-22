import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import Volume from './Volume';
import NumberPad from './NumberPad';
import Select from './Select';
import Media from './Media';
import InputOutput from './InputOutput';
import Channel from './Channel';
import Power from './Power';
import Navigation from './Navigation';

function Controller(props) {
  return (
    <div className="Controller">
      <Power controls={props.controls} {...props} />
      <Channel controls={props.controls} {...props} />
      <Volume controls={props.controls} {...props} />
      <NumberPad controls={props.controls} {...props} />
      <Select controls={props.controls} {...props} />
      <Media controls={props.controls} {...props} />
      <Navigation controls={props.controls} {...props} />

      <InputOutput controls={props.controls} {...props} />

      <h4>Other</h4>
      <div className="Other-List">
        {_.chain(props.controls)
          .filter(control => !control.includes('Volume') && !control.includes('Mute'))
          .filter(control => !control.includes('NumericBasic') && isNaN(parseInt(control, 10)))
          .filter(control => !control.includes('NavigationBasic') && !control.includes('Direction') && !control.includes('Enter') && !control.includes('Select') && !control.includes('OK'))
          .filter(control => !control.includes('TransportExtended') && !control.includes('TransportBasic') && !control.includes('Play') && !control.includes('Stop') && !control.includes('Pause') && !control.includes('Rewind') && !control.includes('FastForwar') && !control.includes('Skip'))
          .filter(control => !control.includes('Input') && !control.includes('Source') && !control.includes('HdmiOut'))
          .filter(control => !control.includes('Channel'))
          .filter(control => !control.includes('Mode'))
          .filter(control => !control.includes('Power') && !control.includes('Standby'))
          .filter(control => !control.includes('FM') && !control.includes('AM'))
          .filter(control => !control.includes('Return') && !control.includes('Menu') && !control.includes('Search') && !control.includes('Setup') && !control.includes('Display') && !control.includes('Back') && !control.includes('Home') && !control.includes('Clear') && !control.includes('Eject') && !control.includes('Info') && !control.includes('Guide') && !control.includes('Exit') && !control.includes('SmartHub') && !control.includes('Tools'))
          .map((control) => {
            const command = control.join ? control.join(',') : control;
            return <APIButton type={props.type} target={props.target} command={command} className="Device" key={control} buttonType="primary" />;
          })
          .value()
        }
      </div>
    </div>
  );
}

Controller.propTypes = {
  controls: React.PropTypes.array,
  target: React.PropTypes.string,
};

export default Controller;
