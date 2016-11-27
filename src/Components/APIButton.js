import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import command from './../command';

class APIButton extends Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.command);
    }

    if (this.props.type) {
      command(`http://192.168.0.4:5000/${this.props.type}${this.props.target ? `/${this.props.target.replace('/', '%2f')}` : ''}/${this.props.command}`);
    }
  }

  render() {
    const text = this.props.command.indexOf(',') > -1 ? this.props.command.split(',')[1] : this.props.command;

    return (
      <div className={this.props.className}>
        <RaisedButton
          primary={this.props.buttonType === 'primary'}
          secondary={this.props.buttonType === 'secondary'}
          onClick={this.onClick.bind(this)}
          className={`${this.props.className}-button`}
          label={this.props.text || text}
        />
      </div>
    );
  }
}

APIButton.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  text: React.PropTypes.string,
  buttonType: React.PropTypes.string,

  type: React.PropTypes.string,
  target: React.PropTypes.string,
  command: React.PropTypes.string,
};

export default APIButton;
