import React, { Component } from 'react';
import request from 'superagent';

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
          {this.state.activities.map(activity =>
            <Activity activity={activity} onClick={this.onClick.bind(this)} key={activity} />
          )}
        </div>

        {this.state.activityControls}
      </div>
    );
  }
}

export default Activities;
