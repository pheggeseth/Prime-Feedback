import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';

class CommentsView extends Component {
  render() {
    return(
      <div>
        <FormTemplate
          category="comments"
          prompt="Any comments you would like to leave?"
          history={this.props.history}
          prevPage="/form/support"
          nextPage="/form/submit" />
      </div>
    );
  }
}

export default CommentsView;