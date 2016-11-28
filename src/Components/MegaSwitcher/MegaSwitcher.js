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
import setSystem from './../../setSystem';
import MegaPowerOff from './../MegaPowerOff';
import Scenes from './Lights';
import ServerURL from './../../Server';

const VideoSources = [
  ['None', null],
  ['PS4', 'InputGame1'],
  ['Xbox One', 'InputGame2'],
  ['PC', 'InputPc'],
  ['Front HDMI', 'InputAux'],
  ['Chromecast', 'InputBd%2FDvd'],
  ['Apple TV', 'InputStrmBox']
];

const SecondaryVideoSources = [
  ['None', null],
  ['PS4', 'InputGame1'],
  ['Xbox One', 'InputGame2'],
  ['PC', 'InputPc'],
  ['Chromecast', 'InputBd%2FDvd'],
  ['Apple TV', 'InputStrmBox']
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

    this.serverURL = ServerURL();
    this.state = {
      mainTv: null,
      secondaryTv: null,
      mainAudio: null,
      scene: null,
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

        <Scenes onChange={(event, index, scene) => this.setState({ scene })} />

        <div className="TurnOnSecondTv-buttons">
          <RaisedButton onClick={setSystem.bind(this, this.state)}>
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
