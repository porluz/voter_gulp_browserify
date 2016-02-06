
import React from 'react';

export default class FeedForm extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <form id="feedForm" className="container">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Title" />
          <input type="text" className="form-control" placeholder="Description" />
          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </div>
      </form>
    );
  }

}
