import React, { Component } from 'react';
import _ from 'lodash';
import request from 'superagent';
import makeClass from 'classnames';

import Slider from 'material-ui/Slider';

import './MasterVolume.css';

class MasterVolume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.getVolume.bind(this), 1000 * 60 * 10);
    this.getVolume();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getVolume() {
    request
    .get('http://192.168.0.4:5000/volume/')
    .end((err, res) => {
      this.setState({ volume: JSON.parse(res.text).volume });
    });
  }

  changeVolume(event, volume) {
    request
      .post(`http://192.168.0.4:5000/volume/${volume}`)
      .end(() => {});
  }

  render() {
    return (
      <div className={makeClass(this.props.className, 'MasterVolume')}>
        <h5>Master Volume</h5>
        <Slider
          value={this.state.volume}
          step={1}
          min={0}
          max={70}
          onChange={_.debounce(this.changeVolume, 150)}
          sliderStyle={{ height: '30px', marginBottom: '24px' }}
        />
      </div>
    );
  }
}

MasterVolume.propTypes = {
  className: React.PropTypes.string
};

export default MasterVolume;
