import React from 'react';
import APIButton from './../Components/APIButton';

function Activity(props) {
  let buttonType = 'primary';

  if (props.activity === props.current) {
    buttonType = 'secondary';
  }

  return <APIButton buttonType={buttonType} type="Activities" className="Activity" command={props.activity} {...props} />;
}

Activity.propTypes = {
  activity: React.PropTypes.string,
  current: React.PropTypes.string
};

export default Activity;
