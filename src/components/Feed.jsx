
import React from 'react';
import ShowAddButton from './ShowAddButton.jsx';
import FeedForm from './FeedForm.jsx';
import FeedList from './FeedList.jsx';

export default class Feed extends React.Component {
  static get displayName() {
  		return 'Feed';
  	}
  constructor() {
    super();
    this.state = { items : [
      { key: '1', title: 'Realtime data!', description:'Firebase is cool!', voteCount:49},
      { key: '2', title: 'Javascript is fun', description:'Lexical scoping FTW', voteCount:34},
      { key: '3', title: 'Coffee makes me anxious', description:'Drink responsibly', voteCount:15}
    ]};
  }

  render() {
    return (
      <div>
        <div className="container">
          <ShowAddButton />
        </div>

        <FeedForm />

        <br />
        <br />

        <FeedList items = {this.state.items} />

      </div>
    );
  }

}
