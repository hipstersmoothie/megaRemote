import React from 'react';
import _ from 'lodash';

import './Controller.css';
import APIButton from './../Components/APIButton';
import { prepare, getControl } from './helpers';

export default function Media(props) {
  const controls = _.filter(props.controls, control => control.includes('TransportBasic') || control.includes('TransportExtended')
    || control.includes('Play') || control.includes('Stop') || control.includes('Pause')
    || control.includes('Rewind') || control.includes('FastForwar') || control.includes('Skip'));

  if (!controls.length) {
    return null;
  }

  const stop = _.find(controls, _.partial(getControl, 'Stop'));
  const play = _.find(controls, _.partial(getControl, 'Play'));
  const pause = _.find(controls, _.partial(getControl, 'Pause'));

  const rewind = _.find(controls, _.partial(getControl, 'Rewind'));
  const fastForward = _.find(controls, _.partial(getControl, 'Fast')) || _.find(controls, _.partial(getControl, 'Enter')) || _.find(controls, _.partial(getControl, 'Return'));
  const skipForward = _.find(controls, _.partial(getControl, 'SkipForward')) || _.find(controls, _.partial(getControl, 'Skip Forward'));
  const skipBackward = _.find(controls, _.partial(getControl, 'SkipBackward')) || _.find(controls, _.partial(getControl, 'Skip Back')) || _.find(controls, _.partial(getControl, 'SkipBack')) || _.find(controls, _.partial(getControl, 'Skip Back'));

  return (
    <div className="Controller">
      <h4>Media</h4>

      <div className="TopRow">
        {stop && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(stop)}
            text="⏹"
            className="Stop"
          />
        )}
        {play && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(play)}
            text="▶"
            className="Play"
          />
        )}
        {pause && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(pause)}
            text="&#10073;&#10073;"
            className="Pause"
          />
        )}
      </div>

      <div className="MiddleRow">
        {rewind && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(rewind)}
            text="⏪"
            className="Rewind"
          />
        )}
        {skipBackward && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(skipBackward)}
            text="◀"
            className="SkipBackward"
          />
        )}
        {skipForward && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(skipForward)}
            text="▶"
            className="SkipForward"
          />
        )}
        {fastForward && (
          <APIButton
            buttonType="primary"
            type={props.type}
            target={props.device}
            command={prepare(fastForward)}
            text="⏩"
            className="FastForward"
          />
        )}
      </div>
    </div>
  );
}

Media.propTypes = {
  controls: React.PropTypes.array,
  type: React.PropTypes.string,
  device: React.PropTypes.string
};
