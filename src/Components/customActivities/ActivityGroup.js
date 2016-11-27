import React, { Component } from 'react';
import _ from 'lodash';

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

  onClick(selection) {
    this.setState({
      selection
    });
    this.props.onClick({ selection });
  }

  deselect(ev) {
    ev.stopPropagation();
    this.setState({
      selection: undefined
    });
    this.props.onClick({ selection: undefined });
  }

  render() {
    return (
      <div className="ActivityGroup">
        <h1>{this.props.title}</h1>

        <div style={_.extend({}, ActivityWrapper, this.state.selection ? { height: 70, width: 300, margin: 'auto' } : {})}>
          {_.map(this.props.activities, source =>
            <Activity {...source} key={source.name} deselect={this.deselect.bind(this)} onClick={this.onClick.bind(this)} current={this.state.selection} />
          )}
        </div>
      </div>
    );
  }
}

ActivityGroup.propTypes = {
  title: React.PropTypes.string,
  activities: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default ActivityGroup;
