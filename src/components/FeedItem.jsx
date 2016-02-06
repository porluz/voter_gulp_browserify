
import React from 'react';

export default class FeedItem extends React.Component {

  constructor(props) {
    super(props);

    this.voteUp= this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);
    //this.vote = this.vote.bind(this);
  }

  vote(newCount) {
    this.props.onVote({
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      voteCount: newCount
    });
  }

  voteUp() {
    var count = parseInt(this.props.voteCount,10);
    var newCount = count+1;
    this.vote(newCount);
  }

  voteDown() {
    var count = parseInt(this.props.voteCount,10);
    var newCount = count-1;
    this.vote(newCount);
  }

  render() {
    var vc = this.props.voteCount;
    var posNegClassName = this.props.voteCount >= 0 ? 'label label-pill label-success'
                                                      :'label label-pill label-danger';
    return (
      <li key={this.props.key} className="list-group-item">
        <span className={posNegClassName} pull-right>{vc}</span>
        <h4>{this.props.title}</h4>
        <span>{this.props.description}</span>
        <span className="pull-right">
          <button id="up" className="btn btn-sm btn-primary"
                          onClick={this.voteUp}>
                          &uarr;
          </button>
          <button id="down" className="btn btn-sm btn-primary"
                            onClick={this.voteDown}>
                            &darr;</button>
        </span>
      </li>
    );
  }

}
