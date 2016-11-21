import React, { Component } from 'react';
import request from 'superagent';
import _ from 'lodash';

import './Activities.css';
import Activity from './Activity';
import Controller from './../Controller/Controller';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      current: null,
      activityControls: null
    };
  }

  componentWillMount() {
    request
      .get('http://localhost:5000/activities')
      .end((err, res) => {
        this.setState({ activities: JSON.parse(res.text) });
      });
  }

  onClick(activity) {
    if (this.state !== activity) {
      this.setState({ current: activity });

      request
        .get(`http://localhost:5000/activities/${activity}`)
        .end((err, res) => {
          this.setState({ activityControls: <Controller controls={JSON.parse(res.text)} type="Activities" device={activity} /> });
        });
    }
  }

  render() {
    return (
      <div className="Activities">
        <h1 className="Activities-header">
          Activities
        </h1>

        <div className="Activities-list">
          {_.chain(this.state.activities)
            .filter(activity => activity !== 'PowerOff')
            .map(activity => <Activity activity={activity} onClick={this.onClick.bind(this)} key={activity} current={this.state.current} />)
            .value()
          }
        </div>

        {this.state.activityControls}
      </div>
    );
  }
}

export default Activities;
