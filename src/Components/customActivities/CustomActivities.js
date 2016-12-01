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

const VideoSources = [
  {
    name: 'PS4',
    input: 'InputGame1',
    icon: 'images/playstation.svg',
    color: '#003791'
  },
  {
    name: 'Xbox One',
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
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/apple.svg',
    color: 'rgb(88, 86, 214)'
  },
  {
    name: 'Netflix',
    isSmartActivity: true,
    input: 'InputStrmBox',
    icon: 'images/netflix.svg',
    color: '#B9090B',
    commands: [
      '/Devices/Apple TV Gen 2%2f3/Menu',
      'timeout',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/Menu',
      '/Devices/Apple TV Gen 2%2f3/DirectionDown',
      '/Devices/Apple TV Gen 2%2f3/Select',
    ]
  },
  {
    name: 'HBO',
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
    // console.log(this.state)
    return (
      <div className="CustomActivities" style={{marginBottom: '60px'}}>
        <MasterVolume />
        <ActivityGroup activities={VideoSources} title="Main TV" onClick={this.selectMain.bind(this)} />
        <ActivityGroup
          activities={VideoSources}
          title="Secondary TV"
          onClick={this.selectSecondary.bind(this)}
          currentMainTv={this.state.mainTvName}
          control={<div className="secondaryPowerToggle" style={{ position: 'absolute', top: 10, right: 10, fill: this.state.color }} onClick={this.secondaryPowerToggle.bind(this)}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512', height: '25px', width: '25px' }} xmlSpace="preserve" width="512px" height="512px">
              <path d="M256,0C114.841,0,0,114.841,0,256s114.841,256,256,256s256-114.841,256-256S397.159,0,256,0z M256,485.345    C129.539,485.345,26.655,382.461,26.655,256S129.539,26.655,256,26.655S485.345,129.539,485.345,256S382.461,485.345,256,485.345z    " />
              <path d="M338.722,115.086c-6.343-3.732-14.513-1.611-18.244,4.733s-1.613,14.513,4.733,18.244    c41.646,24.492,67.517,69.683,67.517,117.937c0,75.394-61.335,136.729-136.729,136.729c-75.393,0-136.729-61.337-136.729-136.729    c0-48.254,25.87-93.445,67.517-117.937c6.345-3.73,8.464-11.899,4.733-18.244c-3.73-6.345-11.898-8.462-18.244-4.733    C123.523,144.347,92.616,198.342,92.616,256c0,90.091,73.293,163.384,163.384,163.384S419.384,346.091,419.382,256    C419.382,198.343,388.475,144.347,338.722,115.086z" />
              <path d="M256,74.832c-7.361,0-13.328,5.968-13.328,13.328V256c0,7.361,5.967,13.328,13.328,13.328    c7.361,0,13.328-5.967,13.328-13.328V88.16C269.328,80.801,263.361,74.832,256,74.832z" />
            </svg>
          </div>}
        />
        <SoundGroup
          videoSources={VideoSources}
          soundSources={SoundSources}
          title="Sound"
          onClick={this.selectSound.bind(this)}
          currentMainTv={this.state.mainTvName}
          control={<RaisedButton style={{ position: 'absolute', top: 10, right: 10, fill: this.state.color }} onClick={() => command(`http://${ServerUrl()}/Devices/Onkyo%20AV%20Receiver/Mode`)}>
            Mode
          </RaisedButton>}
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
