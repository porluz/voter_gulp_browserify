

import React from 'react';

export default class ShowAddButton extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    var classString, buttonText;
    if(this.props.displayed) {
      classString = 'btn btn-default btn-block';
      buttonText = 'Cancel';
    } else {
      classString = 'btn btn-success btn-block';
      buttonText = 'Create New Item';
    }
    return (
      <button className={classString}
              onClick={this.props.onToggleForm}>
              {buttonText}
      </button>
    );
  }

}

module.exports = ShowAddButton;
