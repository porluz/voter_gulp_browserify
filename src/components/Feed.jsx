
import React from 'react';
import ShowAddButton from './ShowAddButton.jsx';
import FeedForm from './FeedForm.jsx';
import FeedList from './FeedList.jsx';
import _ from 'lodash';

export default class Feed extends React.Component {
  static get displayName() {
  		return 'Feed';
  	}
  constructor() {
    super();
    var list = [
      { id: 1, title: 'Realtime data!', description:'Firebase is cool!', voteCount:49},
      { id: 2, title: 'Javascript is fun', description:'Lexical scoping FTW', voteCount:34},
      { id: 3, title: 'Coffee makes me anxious', description:'Drink responsibly', voteCount:15}
    ];
    var formDisplayed = false;
    this.state = { items : list, formDisplayed: formDisplayed };

    // bind functions to this, once.
    this.onToggleForm = this.onToggleForm.bind(this);
    this.onVote = this.onVote.bind(this);
    this.onNewItem = this.onNewItem.bind(this);

  }

  onToggleForm() {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  }

  onNewItem(newItem) {
    newItem.id = this.state.items.length + 1;
    var newItems = this.state.items.concat([newItem]);
    this.setState({
      formDisplayed: false,
      items: newItems
    });
  }

  onVote(item) {
    console.log(item);
    var items = _.uniq(this.state.items);
    var index = _.findIndex(items, function(feedItems) {
      return feedItems.id === item.id;
    });

    var oldObj = items[index];
    var newItems = _.pull(items, oldObj);
    newItems.push(item);
    this.setState({
      items: newItems
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <ShowAddButton onToggleForm={this.onToggleForm}
                          displayed={this.state.formDisplayed}
          />
        </div>

        <FeedForm displayed={this.state.formDisplayed}
                  onNewItem={this.onNewItem}/>

        <br />
        <br />

        <FeedList items = {this.state.items} onVote={this.onVote} />

      </div>
    );
  }

}
