import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ErrorSnackbar from '../../../ErrorSnackbar/ErrorSnackbar.js';
import { RESET_FORM } from '../../../../redux/actions.js';
import { entryIsCompleted } from '../../../../modules/helperFunctions.js';

class SubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostErrorSnackbar: false,
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
        this.props.history.push({pathname: '/form/success', state:{prevPath: '/form/submit'}});
      }).catch(error => {
        console.log('/feedback POST request error:', error);
        this.setState({
          showPostErrorSnackbar: true
        });
      });
    } else {
      this.setState({
        showCompleteFieldsSnackbar: true
      });
    }
  }; // end handleSubmit

  handleErrorSnackbarClose = name => () => {
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
          <Paper style={{height: '250px', marginTop: '40px', padding: '20px'}}>
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
        <ErrorSnackbar 
          open={this.state.showPostErrorSnackbar} 
          onClose={this.handleErrorSnackbarClose('showPostErrorSnackbar')} 
          message="Error submitting feedback!"
        />
        <ErrorSnackbar 
          open={this.state.showCompleteFieldsSnackbar} 
          onClose={this.handleErrorSnackbarClose('showCompleteFieldsSnackbar')} 
          message="Please go back and complete all form fields!"
        />
      </Grid>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({reduxState});
export default connect(mapReduxStateToProps)(SubmitView);