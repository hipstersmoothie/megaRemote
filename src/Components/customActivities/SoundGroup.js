import React from 'react';
import _ from 'lodash';

import './ActivityGroup.css';
import ActivityGroup from './ActivityGroup';

class SoundGroup extends ActivityGroup {
  componentWillReceiveProps(props) {
    const currentActivity = _.find(this.props.videoSources, activity => activity.name === this.state.selection)
      || _.find(this.props.soundSources, activity => activity.name === this.state.selection)
      || {};

    if (!this.state.userInteracted && this.isDisabled(props, currentActivity)) {
      this.deselect({ stopPropagation: () => {} });
    }

    if (!this.state.selection && props.currentMainTv && !this.state.userInteracted) {
      this.setState({ selection: props.currentMainTv });
    } else if (!props.currentMainTv && this.state.selection === this.props.currentMainTv && this.props.currentMainTv) {
      this.setState({ selection: props.currentMainTv });
    }
  }

  isDisabled(props, source) {
    if (props.soundSources.indexOf(source) > -1) {
      return false;
    }

    return props.currentMainTv && source.name && props.currentMainTv !== source.name;
  }

  render() {
    this.selection = this.state.selection || (!this.state.userInteracted && this.props.currentMainTv);
    this.activities = _.union(this.props.videoSources, this.props.soundSources);

    return super.render();
  }
}

SoundGroup.propTypes = {
  title: React.PropTypes.string,
  activities: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default SoundGroup;
