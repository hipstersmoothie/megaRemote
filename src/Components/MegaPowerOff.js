import React, { Component } from 'react';
import request from 'superagent';

class Device extends Component {
  onClick() {
    request
      .post('http://localhost:5000/allOff')
      .end((err, res) => {
        console.log(err, res);
      });
  }

  render() {
    return (
      <button onClick={this.onClick.bind(this)}>
        All Off
      </button>
    );
  }
}

export default Device;
