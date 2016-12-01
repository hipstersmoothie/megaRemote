import React, { Component } from 'react';
import _ from 'lodash';

import Paper from 'material-ui/Paper';
import './ActivityGroup.css';
import Activity from './Activity';

const ActivityWrapper = {
  position: 'relative',
  overflow: 'hidden'
};

class ActivityGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: undefined
    };
  }

  componentWillReceiveProps(props) {
    const currentActivity = _.find(this.props.activities, activity => activity.name === this.state.selection) || {};

    if (this.isDisabled(props, currentActivity)) {
      this.deselect({ stopPropagation: () => {} });
    }
  }

  onClick(selection) {
    if (this.state.selection !== selection) {
      this.setState({
        selection
      });
      this.props.onClick({ selection });
    }
  }

  deselect(ev) {
    ev.stopPropagation();
    this.setState({
      selection: undefined,
      userInteracted: true
    });
    this.props.onClick({ selection: undefined });
  }

  isDisabled(props, source) {
    const appleTvInUse = !!(source.isSmartActivity
      && props.currentMainTv && ['Apple TV', 'Netflix', 'HBO', 'Showtime'].indexOf(props.currentMainTv) > -1
      && props.currentMainTv !== source.name);

    const xboxInUse = !!(source.isXboxActivity
      && props.currentMainTv && props.currentMainTv !== source.name);

    return appleTvInUse || xboxInUse;
  }

  render() {
    return (
      <div className="ActivityGroup">
        <Paper zDepth={2} style={{ position: 'relative', margin: '10px 20px', padding: '10px 20px 30px' }}>
          <h4>{this.props.title}</h4>

          {this.props.control}

          <div style={_.extend({}, ActivityWrapper, this.state.selection ? { height: 70, width: 300, margin: 'auto' } : {})}>
            {_.map(this.activities || this.props.activities, source =>
              <Activity
                {...source}
                key={source.name}
                deselect={this.deselect.bind(this)}
                onClick={this.onClick.bind(this)}
                current={this.selection || this.state.selection}
                disabled={this.isDisabled(this.props, source)}
              />
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

ActivityGroup.propTypes = {
  title: React.PropTypes.string,
  currentMainTv: React.PropTypes.string,
  activities: React.PropTypes.array,
  onClick: React.PropTypes.func,
  control: React.PropTypes.object
};

export default ActivityGroup;
