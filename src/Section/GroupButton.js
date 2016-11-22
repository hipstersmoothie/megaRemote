import React from 'react';
import APIButton from './../Components/APIButton';

function GroupButton(props) {
  let buttonType = 'primary';

  if (props.target === props.current) {
    buttonType = 'secondary';
  }

  return <APIButton buttonType={buttonType} className="SectionChild" command={props.target} {...props} />;
}

GroupButton.propTypes = {
  current: React.PropTypes.string,
  target: React.PropTypes.string
};

export default GroupButton;
