import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SubmitView extends Component {
  // uses react-router-dom to navigate to a specific view
  goToPage = path => this.props.history.push(path);

  handleSubmit = () => {
    const newFeedback = {
      feeling: Number(this.props.reduxState.feeling),
      understanding: Number(this.props.reduxState.understanding),
      support: Number(this.props.reduxState.support),
      comments: this.props.reduxState.comments
    };

    if(Object.entries(newFeedback).every(entryIsCompleted)) {
      axios.post('/feedback', newFeedback)
      .then(response => {
        console.log('/feedback POST request success:', response);
        this.goToPage('/form/success');
      }).catch(error => {
        console.log('/feedback POST request error:', error);
        alert('Error submitting feedback!');
      });
    } else {
      alert('Please go back and complete all form fields!');
      return;
    }
  }; // end handleSubmit

  render() {
    return(
      <div>
        <h1>Would you like to submit your feedback?</h1>
        <button type="button" onClick={this.handleSubmit}>Submit Feedback</button>
      </div>
    );
  }
}

// HELPER FUNCTIONS
const entryIsCompleted = entry => {
  const [key, value] = entry;
  if (key === 'comments') {
    return true; // comments are optional
  } else {
    return Number(value) > 0;
  }
};

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(SubmitView);