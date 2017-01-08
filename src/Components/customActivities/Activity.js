import React, { Component } from 'react';
import _ from 'lodash';
import makeClass from 'classnames';

import Avatar from 'material-ui/Avatar';

const ActivityStyle = {
  display: 'inline-flex',
  margin: '10px',
  borderRadius: '50%',
  color: 'white'
};

const SelectedActivityStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  borderRadius: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  alignItems: 'center'
};

const AvatarStyle = {
  padding: '10px',
  borderRadius: 0,
  backgroundColor: 'initial'
};

const SelectedAvatarStyle = {
  position: 'absolute',
  left: '10px'
};

const SelectedImageStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  height: '15px'
};

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick() {
    if (!this.props.disabled) {
      this.props.onClick(this.props);
    }
  }

  render() {
    const isCurrent = this.props.current === this.props.name;
    let backgroundColor = isCurrent ? this.props.color : 'rgb(188, 188, 188)';

    if (this.props.disabled) {
      backgroundColor = 'rgba(211, 211, 211, 0.31)';
    }

    return (
      <div
        className={makeClass('Activity', { active: isCurrent })}
        style={_.extend({}, ActivityStyle, this.state.background ? { background: this.state.background } : { backgroundColor }, isCurrent ? SelectedActivityStyle : {})}
        onClick={this.onClick.bind(this)}
      >
        <div className="OpacitySliderBlur" style={{ left: this.props.brightness > -1 && this.props.active ? `${this.props.brightness}%` : '100%' }} />
        <Avatar src={this.props.icon} style={_.extend({}, AvatarStyle, !this.props.current || (isCurrent ? SelectedAvatarStyle : { display: 'none' }))} />

        {isCurrent && [
          <h2 key="title" style={isCurrent ? { width: '100%' } : {}}>{this.props.name}</h2>,
          <img key="exit" src="images/x.svg" style={SelectedImageStyle} onClick={this.props.deselect} alt="Deselect" />
        ]}
      </div>
    );
  }
}

Activity.propTypes = {
  onClick: React.PropTypes.func,
  deselect: React.PropTypes.func,
  icon: React.PropTypes.string,
  name: React.PropTypes.string,
  color: React.PropTypes.string,
  current: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  brightness: React.PropTypes.number,
  active: React.PropTypes.bool
};

export default Activity;
