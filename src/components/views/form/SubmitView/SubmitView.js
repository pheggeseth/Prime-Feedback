import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MessageSnackbar from '../../../MessageSnackbar/MessageSnackbar.js';
import { RESET_FORM } from '../../../../redux/actions.js';
import { entryIsCompleted } from '../../../../modules/helperFunctions.js';

class SubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostMessageSnackbar: false,
      showCompleteFieldsSnackbar: false
    };
  }
  // uses react-router-dom to navigate to a specific view
  goToPage = path => this.props.history.push(path);
  
  handleBack = () => this.goToPage('/form/comments');

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
        this.props.dispatch({type: RESET_FORM});

        // Pushing an object onto the path history can give us access to a path "state"
        // we can use this state to pass in the current path ('/form/submit') to the history
        // prop on the SuccessView. This is important, as it allows the success view to check
        // if the previous page was the submit view. As this data is only passed as part of history
        // if the user clicks the Submit button and successfully saves feedback to the database,
        // this makes it impossible for the user to directly navigate to the success view!
        this.props.history.push({pathname: '/form/success', state: {prevPath: '/form/submit'}});

      }).catch(error => {
        console.log('/feedback POST request error:', error);
        this.setState({
          showPostMessageSnackbar: true
        });
      });
    } else {
      this.setState({
        showCompleteFieldsSnackbar: true
      });
    } // end if
  }; // end handleSubmit

  handleMessageSnackbarClose = name => () => {
    this.setState({
      [name]: false
    });
  };

  handleStartOver = () => {
    this.props.dispatch({type: RESET_FORM});
    this.goToPage('/'); // this will redirect to the feeling page, would be useful if the order of views ever changed
  };

  render() {
    return(
      <Grid container justify="center">
        <Grid item sm={6}>
          <Paper style={{height: '300px', marginTop: '40px', padding: '20px'}}>
            {/* stepper container */}
            <Grid container justify="space-around" alignItems="center" style={{height: '20%'}}>
              <Stepper activeStep={4}>
                <Step><StepLabel>Feeling</StepLabel></Step>
                <Step><StepLabel>Understanding</StepLabel></Step>
                <Step><StepLabel>Support</StepLabel></Step>
                <Step><StepLabel>Comments</StepLabel></Step>
                <Step><StepLabel>Submit</StepLabel></Step>
              </Stepper>
            </Grid>
            {/* text container */}
            <Grid container justify="center" alignItems="center" style={{height: '50%'}}>
              <Grid item>
              <Typography variant="display1" gutterBottom>
                Would you like to submit your feedback?
              </Typography>
              </Grid>
            </Grid>
            {/* buttons container */}
            <Grid container justify="space-between" alignItems="flex-end" style={{height: '30%'}}>
              <Grid item style={{flexGrow: 1}}>
                <Grid container justify="flex-start">
                  <Button color="secondary" onClick={this.handleStartOver}>Start over</Button>
                </Grid>
              </Grid>
              <Grid item style={{marginRight: '10px'}}>
                <Button onClick={this.handleBack}>Back</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="raised" onClick={this.handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <MessageSnackbar 
          open={this.state.showPostMessageSnackbar} 
          onClose={this.handleMessageSnackbarClose('showPostMessageSnackbar')} 
          message="Error submitting feedback!"
        />
        <MessageSnackbar 
          open={this.state.showCompleteFieldsSnackbar} 
          onClose={this.handleMessageSnackbarClose('showCompleteFieldsSnackbar')} 
          message="Please go back and complete all form fields!"
        />
      </Grid>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(SubmitView);