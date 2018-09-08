import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions.js';

// This is a generic form template which will update a state in Redux
// according to the category given in this.props.category.
// For example, given a category of "feeling", clicking the Next button
// will cause the value of the input field to be send to the Redux store
// along with an action of 'UPDATE_FEELING'
class FormTemplate extends Component {
  constructor(props) {
    super(props);
    // set the initial state of the input field to whatever is in Redux, if anything
    this.state = {
      value: this.props.reduxState[this.props.category]
    };
  }

  // save the new value of the input field in state
  handleChange = event => {
    const newValue = event.target.value;
    this.setState({
      value: newValue
    });
  };

  saveValueToRedux = value => {
    const action = {
      type: actions[`UPDATE_${this.props.category.toUpperCase()}`],
      payload: value
    };
    this.props.dispatch(action);
  };

  goToPage = path => this.props.history.push(path);

  // submitting form should take us to next page, handled by parent view
  handleNext = () => {
    const value = this.state.value;
    const valueInRedux = this.props.reduxState[this.props.category];

    if (value !== valueInRedux) {
      this.saveValueToRedux(value);
    }
    this.goToPage(this.props.nextPage);
  };

  handleBack = () => this.goToPage(this.props.prevPage);

  handleSubmit = () => {
    const feeling = Number(this.props.reduxState.feeling);
    const understanding = Number(this.props.reduxState.understanding);
    const support = Number(this.props.reduxState.support);
    const comments = this.state.value; // submit only happens on comments form view

    const feedback = {
      feeling,
      understanding,
      support,
      comments
    };

    axios.post('/feedback', feedback)
    .then(response => {
      console.log('/feedback POST request success:', response);
      this.goToPage('/form/success');
    }).catch(error => {
      console.log('/feedback POST request error:', error);
      alert('Error submitting feedback!');
    });
  }

  render() {
    let inputField = null;
    let backButtonIfPath = null;
    let nextButtonIfPath = null;
    let submitFormButtonIfRequired = null;

    if (this.props.category === 'comments') {
      inputField = <input type="text" value={this.state.value} onChange={this.handleChange} />
    } else {
      inputField = <input type="number" min="1" max="5" value={this.state.value} onChange={this.handleChange} />
    }
    if (this.props.prevPage) backButtonIfPath = <button type="button" onClick={this.handleBack}>Back</button>;
    if (this.props.nextPage) nextButtonIfPath = <button type="button" onClick={this.handleNext}>Next</button>;
    if (this.props.submitForm) submitFormButtonIfRequired = <button type="button" onClick={this.handleSubmit}>Submit Feedback</button>

    return (
      <div>
        <h1>{this.props.prompt}</h1>
        <form>
          {inputField}
          {backButtonIfPath}
          {nextButtonIfPath}
          {submitFormButtonIfRequired}
        </form>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(FormTemplate);