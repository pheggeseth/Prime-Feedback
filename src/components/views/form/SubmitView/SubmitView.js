import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
      <Grid container justify="center">
        <Grid item sm={6}>
          <Paper style={{marginTop: '40px', padding: '20px'}}>
            <Grid container justify="center" alignItems="center" style={{height: '60%'}}>
              <Grid item>
              <Typography variant="display1" gutterBottom>
                Would you like to submit your feedback?
              </Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-between" alignItems="flex-end" style={{height: '40%'}}>
              <Grid item style={{flexGrow: 1}}>
                <Grid container justify="flex-start">
                  <Button color="secondary">Start over</Button>
                </Grid>
              </Grid>
              <Grid item style={{marginRight: '10px'}}>
                <Button>Back</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="raised">Submit</Button>
              </Grid>
              
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      // <div>
      //   <h1>Would you like to submit your feedback?</h1>
      //   <button type="button" onClick={this.handleSubmit}>Submit Feedback</button>
      // </div>
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