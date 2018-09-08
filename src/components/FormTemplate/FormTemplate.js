import React, { Component } from 'react';
import { connect } from 'react-redux';


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

  // submitting form should take us to next page, handled by parent view
  handleNext = () => this.props.onNext(this.state.value);

  render() {
    let backButton = null;
    // if an onBack prop is provided, render a Back button so we can go to the previous page
    // handled by parent view
    if (this.props.onBack) {
      backButton = <button type="button" onClick={this.props.onBack}>Back</button>;
    }

    return (
      <div>
        <h1>{this.props.prompt}</h1>
        <form>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
          {backButton}
          <button type="button" onClick={this.handleNext}>Next</button>
        </form>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(FormTemplate);