import React from 'react';
import APIButton from './../Components/APIButton';

function Activity(props) {
  let className = 'Activity';

  if (props.activity === props.current) {
    className = 'SelectedActivity';
  }

  return <APIButton type="Activities" className={className} command={props.activity} {...props} />;
}

Activity.propTypes = {
  activity: React.PropTypes.string,
  current: React.PropTypes.string
};

export default Activity;
