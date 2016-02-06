

import React from 'react';
import FeedItem from './FeedItem.jsx';

export default class FeedList extends React.Component {

  constructor(props) {
    super(props);

    //this.props.onVote = this.onVote.bind(this);
  }

  render() {

    var feedItems = this.props.items.map(function(item) {
      return <FeedItem  id={item.id}
                        key={item.id}
                        title={item.title}
                        description = {item.description}
                        voteCount={item.voteCount}
                        onVote={this.props.onVote} />;
                    }, this);

    return (
      <ul className="list-group container">
        {feedItems}
      </ul>
    );
  }

}
