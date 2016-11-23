import React, { Component } from 'react';
import _ from 'lodash';
import request from 'superagent';

import LightBulb from 'material-ui/svg-icons/action/lightbulb-outline';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
        this.setState({ scenes: JSON.parse(res.text) });
      });
  }

  onChange(event, index, scene) {
    this.setState({ scene });
    this.props.onChange(event, index, scene);
  }

  render() {
    return (
      <div className="Selector">
        <Paper zDepth={2} style={{ margin: '10px 20px' }}>
          <ListItem disabled leftAvatar={<Avatar icon={<LightBulb />} />}>
            Scenes
          </ListItem>
          <ListItem>
            <SelectField
              value={this.state.scene}
              onChange={this.onChange.bind(this)}
              floatingLabelStyle={{ left: 10 }}
              style={{ width: '95%' }}
            >
              <MenuItem key="none" primaryText="None" value="None" />
              {_.map(this.state.scenes, scene => <MenuItem value={scene.id} key={scene.id} primaryText={scene.name} />)}
            </SelectField>
          </ListItem>
        </Paper>
      </div>
    );
  }
}

export default Scenes;
