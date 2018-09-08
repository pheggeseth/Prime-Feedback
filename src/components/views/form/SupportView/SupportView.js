import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';
import { connect } from 'react-redux';
import { UPDATE_SUPPORT } from '../../../../redux/actions.js';

class SupportView extends Component {
  saveSupportToRedux = value => {
    const action = {
      type: UPDATE_SUPPORT,
      payload: value
    };
    this.props.dispatch(action);
  };

  goToPage = path => this.props.history.push(path);

  render() {
    return(
      <div>
        <FormTemplate
        category="support"
        prompt="How well are you being supported?"
        onBack={this.handleBack}
        onNext={this.handleNext} />
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(SupportView);