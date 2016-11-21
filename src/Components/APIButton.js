import React, { Component } from 'react';
import request from 'superagent';

class APIButton extends Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.command);
    }

    if (this.props.type) {
      request
        .post(`http://localhost:5000/${this.props.type}${this.props.target ? `/${this.props.target}` : ''}/${this.props.command}`)
        .end((err, res) => {
          console.log(err, res);
        });
    }
  }

  render() {
    const text = this.props.command.indexOf(',') > -1 ? this.props.command.split(',')[1] : this.props.command;

    return (
      <div className={this.props.className}>
        <button onClick={this.onClick.bind(this)} className={`${this.props.className}-button`}>
          {this.props.text || text}
        </button>
      </div>
    );
  }
}

APIButton.propTypes = {
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  text: React.PropTypes.string,

  type: React.PropTypes.string,
  target: React.PropTypes.string,
  command: React.PropTypes.string,
};

export default APIButton;
