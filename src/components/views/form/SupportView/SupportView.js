import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';

class SupportView extends Component {
  render() {
    return(
      <FormTemplate
        category="support"
        prompt="How well are you being supported?"
        history={this.props.history}
        prevPage="/form/understanding"
        nextPage="/form/comments" 
      />
    );
  }
}

export default SupportView;