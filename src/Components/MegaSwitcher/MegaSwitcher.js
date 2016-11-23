import React, { Component } from 'react';
import _ from 'lodash';

import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SettingsPower from 'material-ui/svg-icons/action/settings-power';
import Speaker from 'material-ui/svg-icons/hardware/speaker-group';

import Avatar from 'material-ui/Avatar';
import TV from 'material-ui/svg-icons/hardware/desktop-windows';
import ListItem from 'material-ui/List/ListItem';

import './MegaSwitcher.css';
import command from './../../command';
import MegaPowerOff from './../MegaPowerOff';

const VideoSources = [
  ['PS4', 'InputGame1'],
  ['Xbox One', 'InputGame2'],
  ['PC', 'InputPc'],
  ['Front HDMI', 'InputAux'],
  ['Chromecast', 'InputBd%2FDvd']
  // '': 'InputStrmBox',
];

const SecondaryVideoSources = [
  ['None', 'None'],
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
      mainTv: 'InputGame1',
      secondaryTv: 'None',
      mainAudio: 'InputGame1',
      turnOnSecondaryTv: false
    };
  }

  onClickMain(event, index, value) {
    this.setState({ mainAudio: value });
    this.setState({
      mainAudio: value,
      mainTv: value
    });
  }

  onClickSecondary(event, index, value) {
    this.setState({
      secondaryTv: value
    });
  }

  onClickAudio(event, index, value) {
    this.setState({
      mainAudio: value
    });
  }

  setSystem() {
    if (this.state.mainTv === 'InputGame2') {
      command('http://192.168.0.4:5000/devices/Samsung%20TV/PowerOn');
    }

    // Set Main TV
    command('http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/PowerOn');
    command('http://192.168.0.4:5000/devices/Samsung%20TV/PowerOn');
    command(`http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/${this.state.mainTv}`);

    // Set Secondary TV
    if (this.state.turnOnSecondaryTv) {
      command('http://192.168.0.4:5000/devices/Vizio%20TV/PowerToggle');
    }

    command('http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver%20(2)/PowerOn');
    command(`http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver%20(2)/${this.state.secondaryTv}`);

    // Set Audio
    if (this.state.mainTv !== this.state.mainAudio) {
      if (this.state.mainAudio === 'InputBluetooth' || this.state.mainAudio === 'InputAirplay') {
        command(`http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/${this.state.mainAudio}`);

        setTimeout(() => {
          command('http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/Mode');
        }, 5000);
      } else {
        command(`http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/${this.state.mainTv}`);
        command(`http://192.168.0.4:5000/devices/Onkyo%20AV%20Receiver/${this.state.mainAudio}`);
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
      <div className="MegaSwitcher">
        <div className="Selector">
          <Paper zDepth={2} style={{ margin: '10px 20px' }}>
            <ListItem disabled leftAvatar={<Avatar icon={<TV />} />}>
              Main TV
            </ListItem>
            <ListItem>
              <SelectField
                value={this.state.mainTv}
                onChange={this.onClickMain.bind(this)}
                floatingLabelStyle={{ left: 10 }}
                style={{ width: '95%' }}
              >
                {_.map(VideoSources, source => <MenuItem value={source[1]} key={source[1]} primaryText={source[0]} />)}
              </SelectField>
            </ListItem>
          </Paper>
        </div>

        <div className="Selector">
          <Paper zDepth={2} style={{ margin: '10px 20px' }}>
            <ListItem disabled leftAvatar={<Avatar icon={<TV />} />}>
              Secondary TV
            </ListItem>
            <ListItem>
              <SelectField
                value={this.state.secondaryTv}
                onChange={this.onClickSecondary.bind(this)}
                floatingLabelStyle={{ left: 10 }}
                style={{ width: '95%' }}
              >
                {_.map(SecondaryVideoSources, source => <MenuItem value={source[1]} key={source[1]} primaryText={source[0]} />)}
              </SelectField>
            </ListItem>

            <Divider
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%',
                backgroundColor: 'rgba(224, 224, 224, 0.5)'
              }}
            />

            <ListItem>
              <div className="TurnOnSecondTv">
                <Checkbox
                  checkedIcon={<SettingsPower />}
                  uncheckedIcon={<SettingsPower />}
                  checked={this.state.turnOnSecondaryTv}
                  onCheck={this.turnOnSecondaryTv.bind(this)}
                  label="Toggle Secordary TV Power"
                />
              </div>
            </ListItem>
          </Paper>
        </div>

        <div className="Selector">
          <Paper zDepth={2} style={{ margin: '10px 20px' }}>
            <ListItem disabled leftAvatar={<Avatar icon={<Speaker />} />}>
              Sound
            </ListItem>
            <ListItem>
              <SelectField
                value={this.state.mainAudio}
                onChange={this.onClickAudio.bind(this)}
                floatingLabelStyle={{ left: 10 }}
                style={{ width: '95%' }}
              >
                {_.map(VideoSources, source => (
                  <MenuItem value={source[1]} key={source[1]} primaryText={source[0]} disabled={source[1] !== this.state.mainAudio} />
                ))}
                {_.map(AudioSources, source => <MenuItem value={source[1]} key={source[1]} primaryText={source[0]} />)}
              </SelectField>
            </ListItem>
          </Paper>
        </div>

        <div className="TurnOnSecondTv-buttons">
          <RaisedButton onClick={this.setSystem.bind(this)}>
            Set!
          </RaisedButton>
          <MegaPowerOff secondary={this.state.turnOnSecondaryTv} />
        </div>
      </div>
    );
  }
}

MegaSwitcher.propTypes = {
  controls: React.PropTypes.array
};

export default MegaSwitcher;
