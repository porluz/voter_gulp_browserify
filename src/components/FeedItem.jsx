
import React from 'react';

export default class FeedItem extends React.Component {

  render() {
    var vc = this.props.voteCount;

    return (
      <li className="list-group-item">
        <span className="badge badge-success">{vc}</span>
        <h4>{this.props.title}</h4>
        <span>{this.props.description}</span>
        <span className="pull-right">
          <button id="up" className="btn btn-sm btn-primary">&uarr;</button>
          <button id="down" className="btn btn-sm btn-primary">&darr;</button>
        </span>
      </li>
    );
  }

}
