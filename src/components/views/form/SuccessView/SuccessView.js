import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

class SuccessView extends Component {
  backToFormBeginning = () => this.props.history.push('/');

  render() {
    if (this.props.location.state && this.props.location.state.prevPath === '/form/submit') {
      return (
        <Grid container justify="center">
          <Grid item sm={6}>
            <Paper style={{height: '250px', marginTop: '40px', padding: '20px'}}>
              <Grid container justify="center" alignItems="center" style={{height: '60%'}}>
                <Grid item>
                  <Typography variant="display1" gutterBottom>
                    Thank you!
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="flex-end" style={{height: '40%'}}>
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