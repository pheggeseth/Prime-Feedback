import React, { Component } from 'react';
import FormTemplate from '../../../FormTemplate/FormTemplate.js';
import { connect } from 'react-redux';
import { UPDATE_UNDERSTANDING } from '../../../../redux/actions.js';

class UnderstandingView extends Component {
  saveUnderstandingToRedux = value => {
    const action = {
      type: UPDATE_UNDERSTANDING,
      payload: value
    };
    this.props.dispatch(action);
  };

  goToPage = path => this.props.history.push(path);

  handleBack = () => {
    this.goToPage('/form/feeling');
  };

  handleNext = value => {
    this.saveUnderstandingToRedux(value);
    this.goToPage('/form/support');
  };

  render() {
    return(
      <div>
        <FormTemplate 
          category="understanding" 
          prompt="How well did you understand today's content?" 
          onBack={this.handleBack}
          onNext={this.handleNext} />
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(UnderstandingView);