import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';

class FeelingView extends Component {
  render() {
    return (
      <FormTemplate 
        category="feeling"
        prompt="How are you feeling?"
        history={this.props.history}
        nextPage="/form/understanding" 
      />
    );
  }
}

export default FeelingView;