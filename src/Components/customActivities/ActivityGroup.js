import React, { Component } from 'react';
import _ from 'lodash';
import makeClass from 'classnames';

import Paper from 'material-ui/Paper';
import './ActivityGroup.css';
import Activity from './Activity';
import MiniControls from './MiniControls';

class ActivityGroup extends Component {
  constructor(props) {
    super(props);

    this.onAdjust = props.onAdjust ? props.onAdjust : () => {};
    this.state = { };
  }

  componentWillReceiveProps(props) {
    const currentActivity = _.find(this.props.activities, activity => activity.name === this.state.selection) || {};

    if (this.isDisabled(props, currentActivity)) {
      this.deselect({ stopPropagation: () => {} });
    }
  }

  onClick(selection) {
    if (this.state.selection !== selection.name) {
      this.setState({
        selection: selection.name,
        inputName: selection.inputName
      });

      this.props.onClick({ selection: selection.name });
    } else {
      this.setState({ showControls: !this.state.showControls });
    }
  }

  deselect(ev) {
    ev.stopPropagation();
    this.setState({
      selection: undefined,
      inputName: undefined,
      userInteracted: true,
      showControls: false
    });
    this.props.onClick({ selection: undefined });
  }

  isDisabled(props, source) {
    const appleTvInUse = !!(source.isSmartActivity
      && props.currentMainTv && ['Apple TV', 'Netflix', 'HBO', 'Showtime'].indexOf(props.currentMainTv) > -1
      && props.currentMainTv !== source.name);

    const currentActivity = _.find(props.activities, activity => activity.name === props.currentMainTv) || {};
    const xboxInUse = !!(source.isXboxActivity && currentActivity.isXboxActivity
      && props.currentMainTv && props.currentMainTv !== source.name);

    return appleTvInUse || xboxInUse;
  }

  render() {
    const ActivityComponent = this.props.activityAsset || Activity;
    const ActivityWrapper = makeClass({
      ActivityWrapper: true,
      SelectedActivity: this.state.selection
    });

    const AvatarWrapper = {
      height: '100%',
      width: '80px',
      display: 'table-cell',
      verticalAlign: 'middle',
      backgroundColor: 'rgb(188, 188, 188)',
    };

    return (
      <div className="ActivityGroup">
        <Paper
          zDepth={2}
          style={{
            position: 'relative',
            margin: '10px 0px',
            display: 'table',
            width: '100%'
          }}
        >
          <div style={{ display: 'table-row' }}>
            <div className={this.props.className} style={AvatarWrapper} onClick={this.props.control} >
              <img role="presentation" src={this.props.icon} style={{ height: '50px', verticalAlign: 'middle' }} />
            </div>

            <div className={ActivityWrapper}>
              {_.map(this.activities || this.props.activities, source =>
                <ActivityComponent
                  {...source}
                  key={source.name}
                  deselect={this.deselect.bind(this)}
                  onClick={this.onClick.bind(this)}
                  onAdjust={this.onAdjust}
                  brightness={this.props.brightness}
                  active={this.props.active}
                  current={this.selection || this.state.selection}
                  disabled={this.isDisabled(this.props, source)}
                />
              )}
            </div>
          </div>
        </Paper>
        <MiniControls target={this.state.inputName} show={this.state.showControls} />
      </div>
    );
  }
}

ActivityGroup.propTypes = {
  currentMainTv: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  icon: React.PropTypes.string,
  activities: React.PropTypes.array,
  onClick: React.PropTypes.func,
  control: React.PropTypes.func, // eslint-disable-line react/no-unused-prop-types,
  onAdjust: React.PropTypes.func,
  activityAsset: React.PropTypes.func,
  className: React.PropTypes.string,
  brightness: React.PropTypes.number,
  active: React.PropTypes.bool
};

export default ActivityGroup;
