import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Redirect } from 'react-router-dom';

class SuccessView extends Component {
  backToFormBeginning = () => this.props.history.push('/form/feeling');

  render() {
    if (this.props.location.state && this.props.location.state.prevPath === '/form/submit') {
      return (
        <Grid container justify="center">
          <Grid item sm={6}>
            <Paper style={{height: '300px', marginTop: '40px', padding: '20px'}}>
              {/* stepper container */}
              <Grid container justify="space-around" alignItems="center" style={{height: '20%'}}>
                <Stepper activeStep={5}>
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
                    Thank you!
                  </Typography>
                </Grid>
              </Grid>
              {/* button container */}
              <Grid container justify="center" alignItems="flex-end" style={{height: '30%'}}>
                <Grid item>
                  <Button 
                    color="primary" 
                    variant="raised" 
                    onClick={this.backToFormBeginning}>
                    Leave New Feedback
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      );
    } else {
      return <Redirect to="/form/feeling"/>;
    }
    
  }
}

export default SuccessView;