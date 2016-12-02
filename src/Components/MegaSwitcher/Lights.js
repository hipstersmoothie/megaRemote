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
    this.state = {
      scene: 'None',
      scenes: []
    };
  }

  componentWillMount() {
    request
      .get(`http://${this.serverURL}/scenes/`)
      .end((err, res) => {
        console.log(JSON.parse(res.text))
        this.setState({ scenes: JSON.parse(res.text) });
      });
  }

  onChange(scene) {
    const found = _.find(this.state.scenes, stateScene => scene.selection === stateScene.name) || {};

    this.setState({ scene: scene.selection });
    this.props.onChange(found.id);
  }

  render() {
    return (
      <ActivityGroup
        icon="/images/lightbulb.svg"
        activities={this.state.scenes}
        title="Lights"
        onClick={this.onChange.bind(this)}
        activityAsset={LightActivity}
        showColor
      />
    );
  }
}

export default Scenes;
