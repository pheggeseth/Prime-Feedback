import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';
import { connect } from 'react-redux';
import { UPDATE_FEELING } from '../../../../redux/actions.js';

class FeelingView extends Component {
  saveFeelingToRedux = value => {
    const action = {
      type: UPDATE_FEELING,
      payload: value
    };
    this.props.dispatch(action);
  };

  goToPage = path => this.props.history.push(path);

  handleNext = value => {
    const valueInRedux = this.props.reduxState.feeling;
    if (valueInRedux !== value) {
      this.saveFeelingToRedux(value);
    }
    
    this.goToPage('/form/understanding');
  };

  render() {
    return (
      <div>
        <FormTemplate 
          category="feeling"
          prompt="How are you feeling?"
          onNext={this.handleNext} />
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(FeelingView);