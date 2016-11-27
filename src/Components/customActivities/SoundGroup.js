import React from 'react';
import _ from 'lodash';

import './ActivityGroup.css';
import Activity from './Activity';
import ActivityGroup from './ActivityGroup';

const ActivityWrapper = {
  position: 'relative',
  overflow: 'hidden'
};

class SoundGroup extends ActivityGroup {
  render() {
    const selection = this.state.selection || (this.state.selection !== undefined && this.props.currentMainTv);
    return (
      <div className="ActivityGroup">
        <h4>{this.props.title}</h4>

        <div style={_.extend({}, ActivityWrapper, selection ? { height: 70, width: 300, margin: 'auto' } : {})}>
          {_.map(this.props.videoSources, source =>
            <Activity
              {...source}
              key={source.name}
              onClick={this.onClick.bind(this)}
              deselect={this.deselect.bind(this)}
              current={selection}
              disabled={!!(this.props.currentMainTv && this.props.currentMainTv !== source.name)}
            />
          )}

          {_.map(this.props.soundSources, source =>
            <Activity
              {...source}
              key={source.name}
              onClick={this.onClick.bind(this)}
              deselect={this.deselect.bind(this)}
              current={selection}
            />
          )}
        </div>
      </div>
    );
  }
}

SoundGroup.propTypes = {
  title: React.PropTypes.string,
  activities: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default SoundGroup;
