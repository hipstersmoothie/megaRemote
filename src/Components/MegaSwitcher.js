import React, { Component } from 'react';
import _ from 'lodash';
import command from './../command';

import './MegaSwitcher.css';
import MegaPowerOff from './MegaPowerOff';

const VideoSources = [
  ['PS4', 'InputGame1'],
  ['Xbox One', 'InputGame2'],
  ['PC', 'InputPc'],
  ['Front HDMI', 'InputAux'],
  ['Chromecast', 'InputBd%2FDvd']
  // '': 'InputStrmBox',
];

const SecondaryVideoSources = [
  ['PS4', 'InputGame1'],
  ['Xbox One', 'InputGame2'],
  ['PC', 'InputPc'],
  ['Chromecast', 'InputBd%2FDvd']
];

const AudioSources = [
  ['Airplay', 'InputAirplay'],
  ['Bluetooth', 'InputBluetooth'],
  ['Record Player', 'InputCd'],
  ['Net', 'InputNet'],
  ['Secondary TV Sound', 'InputTv']
];

class MegaSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainAudio: 'InputGame1',
      turnOnSecondaryTv: false
    };
  }

  onClickMain(ev) {
    this.audioPicker.value = ev.target.value;
    this.setState({
      mainAudio: ev.target.value
    });
  }

  setSystem() {
    if (this.mainTvPicker.value === 'InputGame2') {
      command('http://localhost:5000/devices/Samsung%20TV/PowerOn');
    }

    // Set Main TV
    command('http://localhost:5000/devices/Onkyo%20AV%20Receiver/PowerOn');
    command('http://localhost:5000/devices/Samsung%20TV/PowerOn');
    command(`http://localhost:5000/devices/Onkyo%20AV%20Receiver/${this.mainTvPicker.value}`);

    // Set Secondary TV
    if (this.state.turnOnSecondaryTv) {
      command('http://localhost:5000/devices/Vizio%20TV/PowerToggle');
    }

    command('http://localhost:5000/devices/Onkyo%20AV%20Receiver%20(2)/PowerOn');
    command(`http://localhost:5000/devices/Onkyo%20AV%20Receiver%20(2)/${this.secondaryTvPicker.value}`);

    // Set Audio
    if (this.mainTvPicker.value !== this.audioPicker.value) {
      if (this.audioPicker.value === 'InputBluetooth' || this.audioPicker.value === 'InputAirplay') {
        command(`http://localhost:5000/devices/Onkyo%20AV%20Receiver/${this.audioPicker.value}`);

        setTimeout(() => {
          command('http://localhost:5000/devices/Onkyo%20AV%20Receiver/Mode');
        }, 5000);
      } else {
        command(`http://localhost:5000/devices/Onkyo%20AV%20Receiver/${this.mainTvPicker.value}`);
        command(`http://localhost:5000/devices/Onkyo%20AV%20Receiver/${this.audioPicker.value}`);
      }
    }
  }

  turnOnSecondaryTv() {
    this.setState({
      turnOnSecondaryTv: !this.state.turnOnSecondaryTv
    });
  }

  render() {
    return (
      <div>
        <div className="MegaSwitcher">
          <div className="MegaSwitcher-section">
            <h5>Main TV</h5>
            <select
              onChange={this.onClickMain.bind(this)}
              ref={(ref) => {
                this.mainTvPicker = ref;
              }}
            >
              {_.map(VideoSources, source => (
                <option value={source[1]} key={source[1]}>
                  {source[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="MegaSwitcher-section">
            <h5>Secondary TV</h5>
            <select
              ref={(ref) => {
                this.secondaryTvPicker = ref;
              }}
            >
              {_.map(SecondaryVideoSources, source => (
                <option value={source[1]} key={source[1]}>
                  {source[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="MegaSwitcher-section">
            <h5>Sound</h5>
            <select
              ref={(ref) => {
                this.audioPicker = ref;
              }}
            >
              {_.map(VideoSources, source => (
                <option value={source[1]} disabled={source[1] !== this.state.mainAudio} key={source[1]}>
                  {source[0]}
                </option>
              ))}

              {_.map(AudioSources, source => (
                <option value={source[1]} key={source[1]}>
                  {source[0]}
                </option>
              ))}
            </select>
          </div>

          <div className="MegaSwitcher-section">
            <div className="TurnOnSecondTv">
              <input
                checked={this.state.turnOnSecondaryTv}
                type="checkbox"
                id="cbox2"
                onClick={this.turnOnSecondaryTv.bind(this)}
              />
              <label htmlFor="cbox2" style={{ display: 'inline-block' }}>
                Toggle Secordary TV Power
                </label>
            </div>

            <div className="TurnOnSecondTv-buttons">
              <button onClick={this.setSystem.bind(this)}>
                Set!
              </button>
              <MegaPowerOff secondary={this.state.turnOnSecondaryTv} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MegaSwitcher.propTypes = {
  controls: React.PropTypes.array
};

export default MegaSwitcher;
