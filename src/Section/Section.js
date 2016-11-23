import React, { Component } from 'react';
import request from 'superagent';

import './Section.css';
import Controller from './../Controller/Controller';
import GroupButton from './GroupButton';
import Loader from './../Components/Loader/Loader';
import ServerURL from './../Server';

class Section extends Component {
  constructor(props) {
    super(props);

    this.serverURL = ServerURL();
    this.state = {
      array: [],
      current: null,
      loadingController: false,
      controller: null
    };
  }

  componentWillMount() {
    request
      .get(`http://${this.serverURL}/${this.props.route}`)
      .end((err, res) => {
        this.setState({ array: JSON.parse(res.text) });
      });
  }

  onClick(target) {
    if (this.state.current !== target) {
      this.setState({
        current: target,
        loadingController: true
      });

      request
        .get(`http://${this.serverURL}/${this.props.route}/${target}`)
        .end((err, res) => {
          this.setState({
            controller: <Controller type={this.props.route} target={target} controls={JSON.parse(res.text)} />,
            loadingController: false
          });
        });
    }

    if (this.props.onSelection) {
      this.props.onSelection(target);
    }
  }

  render() {
    const loading = <Loader />;

    return (
      <div className="Section">
        <h1 className="Section-header">
          {this.props.route}
        </h1>

        {this.state.array.length > 0 && (
          <div className="Section-list">
            {this.state.array.map(child =>
              <GroupButton target={child} onClick={this.onClick.bind(this)} key={child} current={this.state.current} />
            )}
          </div>
        )}

        {this.state.array.length && !this.state.loadingController ? (
          this.state.controller
        ) : (
          loading
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
