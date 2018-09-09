import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Feedback
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;