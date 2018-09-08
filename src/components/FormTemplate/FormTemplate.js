import React, { Component } from 'react';
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

  // calling saveValueToRedux will take whatever is currently stored
  // in this.state.value and save it in the Redux store, using the 'UPDATE'
  // action corresponding to the 'category' supplied to props in FormTemplate
  saveValueToRedux = value => {
    const action = {
      type: actions[`UPDATE_${this.props.category.toUpperCase()}`],
      payload: value
    };
    this.props.dispatch(action);
  };

  // uses react-router-dom to navigate to a specific view
  goToPage = path => this.props.history.push(path);

  // submitting form should take us to next page, handled by parent view
  handleNext = () => {
    const valueInState = this.state.value;

    if (entryIsCompleted([this.props.category, valueInState])) {
      const valueInRedux = this.props.reduxState[this.props.category];

      if (valueInState !== valueInRedux) {
        this.saveValueToRedux(valueInState);
      }
      this.goToPage(this.props.nextPage);
    } else {
      alert('Please give feedback before continuing.');
      return;
    }
  };

  // go to the previous page when the user clicks the Back button
  // this will abandon changes on this page if the user has not first clicked "Next"
  handleBack = () => this.goToPage(this.props.prevPage);
  // TODO: add confirm dialog letting user know their changes will be abandoned

  render() {
    let inputField = null;
    let backButtonIfPath = null;
    let nextButtonIfPath = null;

    if (this.props.category === 'comments') {
      inputField = <input type="text" value={this.state.value} onChange={this.handleChange} />
    } else {
      inputField = <input type="number" min="1" max="5" value={this.state.value} onChange={this.handleChange} />
    }

    if (this.props.prevPage) backButtonIfPath = <button type="button" onClick={this.handleBack}>Back</button>;
    if (this.props.nextPage) nextButtonIfPath = <button type="button" onClick={this.handleNext}>Next</button>;

    return (
      <div>
        <h1>{this.props.prompt}</h1>
        <form>
          {inputField}
          {backButtonIfPath}
          {nextButtonIfPath}
        </form>
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
export default connect(mapReduxStateToProps)(FormTemplate);