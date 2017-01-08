import React, { Component } from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import ActivityGroup from './ActivityGroup';
import SoundGroup from './SoundGroup';
import MegaPowerOff from './../MegaPowerOff';
import setSystem from './../../setSystem';
import MasterVolume from './../MasterVolume/MasterVolume';
import command from './../../command';
import ServerUrl from './../../Server';
import Scenes from './../MegaSwitcher/Lights';
import './../MegaSwitcher/MegaSwitcher.css';

const VideoSources = [
  {
    name: 'PS4',
    inputName: 'Sony PS4',
    input: 'InputGame1',
    icon: 'images/playstation.svg',
    color: '#003791'
  },
  {
    name: 'Xbox One',
    inputName: 'Microsoft Xbox One',
    isXboxActivity: true,
    input: 'InputGame2',
    icon: 'images/xbox.svg',
    color: '#5dc21e'
  },
  {
    name: 'PC',
    input: 'InputPc',
    icon: 'images/laptop.svg',
    color: 'rgb(90, 200, 250)'
  },
  {
    name: 'Apple TV',
    inputName: 'Apple TV Gen 2/3',
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/apple.svg',
    color: 'rgb(88, 86, 214)'
  },
  {
    name: 'Netflix',
    inputName: 'Apple TV Gen 2/3',
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/netflix.svg',
    color: '#B9090B',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      'timeout',
      'timeout',
      'timeout',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/Select',
    ]
  },
  {
    name: 'HBO',
    inputName: 'Apple TV Gen 2/3',
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/HBO Go.svg',
    color: 'rgb(33, 150, 243)',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      'timeout',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      '/Devices/Apple TV Gen 2%2f3/Select'
    ]
  },
  {
    name: 'Showtime',
    inputName: 'Apple TV Gen 2/3',
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/SHO.svg',
    color: '#FF0101',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      'timeout',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      'timeout',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      '/Devices/Apple TV Gen 2%2f3/Select'
    ]
  },
  {
    name: 'Plex',
    inputName: 'Microsoft Xbox One',
    isXboxActivity: true,
    input: 'InputGame2',
    icon: 'images/plex.svg',
    color: '#e5a00d',
    commands: [
      '/Devices/Microsoft%20Xbox%20One/Xbox',
      'timeout',
      'timeout',
      'timeout',
      '/Devices/Microsoft%20Xbox%20One/DirectionDown',
      '/Devices/Microsoft%20Xbox%20One/DirectionDown',
      '/Devices/Microsoft%20Xbox%20One/DirectionDown',
      '/Devices/Microsoft%20Xbox%20One/DirectionDown',
      '/Devices/Microsoft%20Xbox%20One/DirectionDown',
      '/Devices/Microsoft%20Xbox%20One/A'
    ]
  }
];

const SoundSources = [
  {
    name: 'Bluetooth',
    input: 'InputBluetooth',
    icon: 'images/bluetooth.svg',
    color: '#1565C0'
  },
  {
    name: 'Airplay',
    input: 'InputAirplay',
    icon: 'images/airplay.svg',
    color: '#CE93D8'
  },
  {
    name: 'Record Player',
    input: 'InputCd',
    icon: 'images/record.svg',
    color: '#e53935'
  },
  {
    name: 'Net',
    input: 'InputNet',
    icon: 'images/globe.svg',
    color: '#81D4FA'
  },
  {
    name: 'TV2 Sound',
    input: 'InputTv',
    icon: 'images/tv2.svg',
    color: '#26A69A'
  }
];

function findSource(sources, event) {
  const input = _.find(sources, source => source.name === event.selection);

  return input ? input.input : null;
}

class CustomActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainTv: null,
      secondaryTv: null,
      mainAudio: undefined
    };
  }

  setSystem() {
    const extraCommands = _.find(VideoSources, source => (source.name === this.state.mainTvName || source.name === this.state.secondaryTvName) && source.commands) || {};
    setSystem(this.state, extraCommands.commands);
  }

  selectMain(event) {
    this.setState({
      mainTvName: event.selection,
      mainTv: findSource(VideoSources, event)
    });
  }

  selectSecondary(event) {
    this.setState({
      secondaryTvName: event.selection,
      secondaryTv: findSource(VideoSources, event)
    });
  }

  selectSound(event) {
    this.setState({
      mainAudioName: event.selection,
      mainAudio: findSource(SoundSources, event)
    });
  }

  secondaryPowerToggle() {
    this.setState({ color: this.state.color === 'red' ? 'black' : 'red' });
    command(`http://${ServerUrl()}/Devices/Vizio%20TV/PowerToggle`);
  }

  render() {
    return (
      <div className="CustomActivities" style={{ paddingBottom: '60px' }}>
        <MasterVolume />
        <ActivityGroup
          icon="/images/tv.svg"
          activities={VideoSources}
          title="Main TV"
          onClick={this.selectMain.bind(this)}
        />
        <ActivityGroup
          icon="/images/tv2.svg"
          activities={VideoSources}
          title="Secondary TV"
          onClick={this.selectSecondary.bind(this)}
          currentMainTv={this.state.mainTvName}
          control={this.secondaryPowerToggle.bind(this)}
          className="ActiveWrapper"
        />
        <SoundGroup
          icon="/images/speaker.svg"
          videoSources={VideoSources}
          soundSources={SoundSources}
          title="Sound"
          onClick={this.selectSound.bind(this)}
          currentMainTv={this.state.mainTvName}
          control={() => command(`http://${ServerUrl()}/Devices/Onkyo%20AV%20Receiver/Mode`)}
          className="ActiveSoundWrapper"
        />

        <Scenes active={this.state.setActive} onChange={scene => this.setState({ scene, setActive: false })} />

        <div className="TurnOnSecondTv-buttons" style={{ marginTop: '20px' }}>
          <RaisedButton
            onClick={() => {
              this.setSystem.bind(this)();
              this.setState({ setActive: true });
            }}
          >
            Set!
          </RaisedButton>
          <MegaPowerOff secondary={this.state.turnOnSecondaryTv} />
        </div>
      </div>
    );
  }
}

export default CustomActivities;
