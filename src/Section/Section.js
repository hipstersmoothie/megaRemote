import React, { Component } from 'react';
import request from 'superagent';
import CircularProgress from 'material-ui/CircularProgress';

import './Section.css';
import Controller from './../Controller/Controller';
import GroupButton from './GroupButton';

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      current: null,
      controller: null
    };
  }

  componentWillMount() {
    request
      .get(`http://192.168.0.4:5000/${this.props.route}`)
      .end((err, res) => {
        this.setState({ array: JSON.parse(res.text) });
      });
  }

  onClick(target) {
    if (this.state !== target) {
      this.setState({ current: target });

      request
        .get(`http://192.168.0.4:5000/${this.props.route}/${target}`)
        .end((err, res) => {
          this.setState({ controller: <Controller type={this.props.route} target={target} controls={JSON.parse(res.text)} /> });
        });
    }

    if (this.props.onSelection) {
      this.props.onSelection(target);
    }
  }

  render() {
    return (
      <div className="Section">
        <h1 className="Section-header">
          {this.props.route}
        </h1>

        {this.state.array.length ? [
          <div className="Section-list">
            {this.state.array.map(child =>
              <GroupButton target={child} onClick={this.onClick.bind(this)} key={child} current={this.state.current} />
            )}
          </div>,
          this.state.controller
        ] : (
          <CircularProgress size={40} thickness={4} />
        )}
      </div>
    );
  }
}

Section.propTypes = {
  onSelection: React.PropTypes.func,
  route: React.PropTypes.string
};

export default Section;
