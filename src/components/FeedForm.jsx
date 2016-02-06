
import React from 'react';

export default class FeedForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(e) {
    e.preventDefault();

    var newItem = {
      title: this.refs.title.value,
      description: this.refs.desc.value,
      voteCount: 0
      //id: items.length
    };

    this.refs.feedForm.reset();
    this.props.onNewItem(newItem);
  }


  render() {

    var display = this.props.displayed ? 'block' : 'none';
    var styles = {
      display: display
    };

    return (
      <form ref="feedForm" style={styles} id="feedForm" className="container" onSubmit={this.handleForm}>
        <div className="form-group">
          <input ref="title" type="text" className="form-control" placeholder="Title" />
          <input ref="desc" type="text" className="form-control" placeholder="Description" />
          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </div>
      </form>
    );
  }

}
