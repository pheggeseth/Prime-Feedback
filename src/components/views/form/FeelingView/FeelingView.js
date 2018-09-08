import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';
import { connect } from 'react-redux';
import { UPDATE_FEELING } from '../../../../redux/actions.js';

class FeelingView extends Component {

  handleNext = value => {
    this.saveFeelingInRedux(value);
    this.goToNextPage('/form/understanding');
  };

  saveFeelingInRedux = value => {
    const action = {
      type: UPDATE_FEELING,
      payload: value
    };
    this.props.dispatch(action);
  };

  goToNextPage = path => this.props.history.push(path);

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