

import React from 'react';
import FeedItem from './FeedItem.jsx';

export default class FeedList extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {


    var feedItems = this.props.items.map(function(item) {
      return <FeedItem title={item.title} desc = {item.description} voteCount={item.voteCount} />;
    });

    return (
      <ul class="list-group">
        {feedItems}
      </ul>
    );
  }

}
