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

  render() {
    return (
      <div>
        <h1>{this.props.prompt}</h1>
        <form>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          {this.props.prevPage
          ? <button type="button" onClick={this.handleBack}>Back</button> 
          : null}
          <button type="button" onClick={this.handleNext}>Next</button>
        </form>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(FormTemplate);