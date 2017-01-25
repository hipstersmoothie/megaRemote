import React, { Component } from 'react';
import _ from 'lodash';
import request from 'superagent';

import ActivityGroup from './../customActivities/ActivityGroup';
import LightActivity from './LightActivity';
import ServerURL from './../../Server';

class Scenes extends Component {
  constructor(props) {
    super(props);

    this.serverURL = ServerURL();
    this.scene = 'None';
    this.state = {
      scenes: []
    };
    this.updateBri = _.debounce(this.updateBri, 1000);
  }

  componentWillMount() {
    request
      .get(`http://${this.serverURL}/scenes/`)
      .end((err, res) => {
        this.setState({ scenes: JSON.parse(res.text) });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active && this.scene) {
      this.getBri();
    } else {
      this.setState({ brightness: null });
    }
  }

  onChange(scene) {
    const found = _.find(this.state.scenes, stateScene => scene.selection === stateScene.name) || {};
    this.scene = scene.selection;

    if (found) {
      this.props.onChange(found.id);
    }
  }

  onAdjust(bri) {
    if (this.props.active) {
      this.setState({ brightness: bri });
      this.updateBri(bri);
    }
  }

  getBri() {
    request
      .get(`http://${this.serverURL}/brightness/`)
      .end((err, res) => {
        this.setState({ brightness: JSON.parse(res.text).bri });
      });
  }

  updateBri(bri) {
    request
      .post(`http://${this.serverURL}/brightness/${bri}`)
      .end(() => { });
  }

  render() {
    return (
      <div className="Lights">
        <ActivityGroup
          icon="/images/lightbulb.svg"
          activities={this.state.scenes}
          title="Lights"
          onClick={this.onChange.bind(this)}
          activityAsset={LightActivity}
          brightness={this.state.brightness}
          active={this.props.active}
          onAdjust={this.onAdjust.bind(this)}
          showColor
        />
      </div>
    );
  }
}

Scenes.propTypes = {
  onChange: React.PropTypes.func,
  active: React.PropTypes.bool
};

export default Scenes;
