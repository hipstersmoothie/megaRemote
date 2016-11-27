import React, { Component } from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/RaisedButton';
import ActivityGroup from './ActivityGroup';
import SoundGroup from './SoundGroup';
import MegaPowerOff from './../MegaPowerOff';
import setSystem from './../../setSystem';

const VideoSources = [
  {
    name: 'PS4',
    input: 'InputGame1',
    icon: 'images/playstation.svg',
    color: '#003791'
  },
  {
    name: 'Xbox One',
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
    input: 'InputStrmBox',
    icon: 'images/apple.svg',
    color: 'rgb(88, 86, 214)'
  },
  {
    name: 'Netflix',
    input: 'InputStrmBox',
    icon: 'images/netflix.svg',
    color: '#B9090B',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/Select'
    ]
  },
  {
    name: 'HBO',
    input: 'InputStrmBox',
    icon: 'images/HBO Go.svg',
    color: 'rgb(33, 150, 243)',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      '/Devices/Apple TV Gen 2%2f3/Select'
    ]
  },
  {
    name: 'Showtime',
    input: 'InputStrmBox',
    icon: 'images/SHO.svg',
    color: '#FF0101',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      '/Devices/Apple TV Gen 2%2f3/DirectionRight',
      '/Devices/Apple TV Gen 2%2f3/Select'
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
    name: 'tv2 Sound',
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

  setSystem() {
    const extraCommands = _.find(VideoSources, source => (source.name === this.state.mainTvName || source.name === this.state.secondaryTvName) && source.commands) || {};
    setSystem(this.state, extraCommands.commands);
  }

  render() {
    return (
      <div className="CustomActivities">
        <ActivityGroup activities={VideoSources} title="Main TV" onClick={this.selectMain.bind(this)} />
        <ActivityGroup activities={VideoSources} title="Secondary TV" onClick={this.selectSecondary.bind(this)} />
        <SoundGroup
          videoSources={VideoSources}
          soundSources={SoundSources}
          title="Sound"
          onClick={this.selectSound.bind(this)}
          currentMainTv={this.state.mainTvName}
        />

        <div className="TurnOnSecondTv-buttons" style={{ marginTop: '20px' }}>
          <RaisedButton onClick={this.setSystem.bind(this)}>
            Set!
          </RaisedButton>
          <MegaPowerOff secondary={this.state.turnOnSecondaryTv} />
        </div>
      </div>
    );
  }
}

CustomActivities.propTypes = {

};

export default CustomActivities;
