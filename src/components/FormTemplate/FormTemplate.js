import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions.js';
import { Grid, Paper, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      inputField = 
        <TextField 
          placeholder="Add comments here..."
          multiline 
          margin="normal" 
          style={{width: '300px'}} />;
    } else {
      inputField = 
      <RadioGroup value={this.state.value} onChange={this.handleChange} row>
        <FormControlLabel value="1" control={<Radio checkedIcon={<FontAwesomeIcon icon="sad-cry" />} />} label="1" />
        <FormControlLabel value="2" control={<Radio checkedIcon={<FontAwesomeIcon icon="frown" />} />} label="2" />
        <FormControlLabel value="3" control={<Radio checkedIcon={<FontAwesomeIcon icon="meh" />} />} label="3" />
        <FormControlLabel value="4" control={<Radio checkedIcon={<FontAwesomeIcon icon="smile" />} />} label="4" />
        <FormControlLabel value="5" control={<Radio checkedIcon={<FontAwesomeIcon icon="smile-beam" />} />} label="5" />
      </RadioGroup>;
    }

    if (this.props.prevPage) backButtonIfPath = <Button onClick={this.handleBack}>Back</Button>;
    if (this.props.nextPage) nextButtonIfPath = <Button color="primary" variant="raised" onClick={this.handleNext}>Next</Button>;

    return (
      <Grid container justify="center">
        <Grid item sm={6}>
          <Paper style={{height: '250px', marginTop: '40px', padding: '20px'}}>
            <Grid container justify="center" alignItems="center" style={{height: '60%'}}>
              <Typography variant="display1" gutterBottom>
                {this.props.prompt}
              </Typography>
            </Grid>
            <Grid container alignContent="flex-end" style={{height: '40%'}}>
              <Grid container justify="center">
                <Grid item>
                  {inputField}
                </Grid>
              </Grid>
              <Grid container justify="space-between" style={{marginTop: '20px'}}>
                <Grid item>
                  {backButtonIfPath}
                </Grid>
                <Grid item>
                  {nextButtonIfPath}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
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