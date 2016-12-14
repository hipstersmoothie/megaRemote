import React, { Component } from 'react';
import request from 'superagent';

import Select from './../../Controller/Select';
import Navigation from './../../Controller/Navigation';
import ServerURL from './../../Server';
import Loader from './../Loader/Loader';

class MiniControls extends Component {
  constructor(props) {
    super(props);

    this.serverURL = ServerURL();
    this.state = { controls: [] };
  }

  componentWillReceiveProps(props) {
    if (this.props.target !== props.target && props.target !== undefined) {
      this.getControls(props.target);
    }
  }

  getControls(target) {
    this.setState({ loading: true });
    request
      .get(`http://${this.serverURL}/devices/${target.replace('/', '%2f')}`)
      .end((err, res) => {
        this.setState({
          controls: JSON.parse(res.text),
          loading: false
        });
      });
  }

  render() {
    if (this.state.loading && this.props.show) {
      return <Loader />;
    }

    if (this.props.target && this.props.show) {
      return (
        <div className="ActivityMiniControl">
          <Select type="devices" target={this.props.target} controls={this.state.controls} />
          <Navigation type="devices" target={this.props.target} controls={this.state.controls} />
        </div>
      );
    }

    return null;
  }
}

MiniControls.propTypes = {
  target: React.PropTypes.string,
  show: React.PropTypes.bool
};

export default MiniControls;
