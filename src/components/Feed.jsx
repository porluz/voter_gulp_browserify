
import React from 'react';
import ShowAddButton from './ShowAddButton.jsx';
import FeedForm from './FeedForm.jsx';
import FeedList from './FeedList.jsx';
import _ from 'lodash';
import Firebase from 'firebase';

export default class Feed extends React.Component {
  static get displayName() {
  		return 'Feed';
  	}

  constructor(props) {
    super(props);
    var formDisplayed = false;
    this.state = { items : [], formDisplayed: formDisplayed };

    // bind functions to this, once.
    this.onToggleForm = this.onToggleForm.bind(this);
    this.onVote = this.onVote.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.loadData = this.loadData.bind(this);

    this.fbRef = new Firebase('https://shining-inferno-6585.firebaseio.com/feed');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.fbRef.on('value', function(snap) {
      var items = [];
      var sortedItems = [];

      snap.forEach(function(itemSnap) {
        var item = itemSnap.val();
        item.id = itemSnap.key();
        items.push(item);
      });

      sortedItems = _.sortBy(items, function(item) {
        return -item.voteCount;
      });

      this.setState({
        items: sortedItems
      });

    }.bind(this));
  }

  onToggleForm() {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  }

  onNewItem(newItem) {
    // newItem.id = this.state.items.length + 1;
    // var newItems = this.state.items.concat([newItem]);
    // this.setState({
    //   formDisplayed: false,
    //   items: newItems
    // });
    this.fbRef.push(newItem);
  }

  onVote(item) {
    // console.log(item);
    // var items = _.uniq(this.state.items);
    // var index = _.findIndex(items, function(feedItems) {
    //   return feedItems.id === item.id;
    // });
    //
    // var oldObj = items[index];
    // var newItems = _.pull(items, oldObj);
    // newItems.push(item);
    // this.setState({
    //   items: newItems
    // });
    var ref = new Firebase('https://shining-inferno-6585.firebaseio.com/feed').child(item.id);
    ref.update(item);
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
