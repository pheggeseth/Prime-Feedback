import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

class ConfirmDeleteDialog extends Component {
  handleCancel = () => this.props.onClose(false);
  handleConfirm = () => this.props.onClose(true);

  render() {
    const { value, ...other } = this.props;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You cannot undo this action.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button color="secondary" variant="raised" onClick={this.handleConfirm}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDeleteDialog;