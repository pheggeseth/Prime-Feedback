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
      // <header className="App-header">
      //   <h1 className="App-title">Feedback!</h1>
      //   <h4><i>Don't forget it!</i></h4>
      // </header>
    );
  }
}

export default Header;