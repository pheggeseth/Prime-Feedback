import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// this is a wrapper component for the Material-UI Snackbar
// which only takes the open Boolean, onClose handler, and message text as props
class MessageSnackbar extends Component {
  handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      this.props.onClose();
    }
  };

  render() {
    return(
      /* Snackbar format from Material-UI website */
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }
}

export default MessageSnackbar;