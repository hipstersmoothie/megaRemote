import React, { Component } from 'react';
import request from 'superagent';

import './Devices.css';
import Device from './Device';
import Controller from './../Controller/Controller';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      current: null,
      deviceController: null
    };
  }

  componentWillMount() {
    request
      .get('http://localhost:5000/devices')
      .end((err, res) => {
        this.setState({ devices: JSON.parse(res.text) });
      });
  }

  onClick(device) {
    if (this.state !== device) {
      this.setState({ current: device });

      request
        .get(`http://localhost:5000/devices/${device}`)
        .end((err, res) => {
          this.setState({ activityControls: <Controller type="Devices" device={device} controls={JSON.parse(res.text)} /> });
        });
    }
  }

  render() {
    return (
      <div className="Devices">
        <h1 className="Devices-header">
          Devices
        </h1>

        <div className="Devices-list">
          {this.state.devices.map(device =>
            <Device device={device} onClick={this.onClick.bind(this)} key={device} />
          )}
        </div>

        {this.state.activityControls}
      </div>
    );
  }
}

export default Devices;
