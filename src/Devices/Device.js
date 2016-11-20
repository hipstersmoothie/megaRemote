import React, { Component } from 'react';
import APIButton from './../Components/APIButton';

class Device extends Component {
  render() {
    return <APIButton className='Device' command={this.props.device} {...this.props} />;
  }
}

export default Device;
