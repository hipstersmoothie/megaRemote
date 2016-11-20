import React from 'react';
import APIButton from './../Components/APIButton';

function Activity(props) {
  return <APIButton type="Activities" className="Activity" command={props.activity} {...props} />;
}

Activity.propTypes = {
  activity: React.PropTypes.string
};

export default Activity;
