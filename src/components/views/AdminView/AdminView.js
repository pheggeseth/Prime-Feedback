import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';
import ConfirmDeleteDialog from '../../ConfirmDeleteDialog/ConfirmDeleteDialog.js';
import MessageSnackbar from '../../MessageSnackbar/MessageSnackbar.js';


class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      confirmDeleteDialogIsOpen: false,
      deleteConfirmedSnackbarIsOpen: false
    };
  }

  componentDidMount() {
    this.getFeedbackFromServer();
  }

  getFeedbackFromServer = () => {
    axios.get('/feedback')
    .then(response => {
      console.log('/feedback GET request success:', response.data);
      this.setState({
        feedback: response.data
      });
    }).catch(error => {
      console.log('/feedback GET request error:', error);
      alert('Error getting feedback from server!');
    });
  };

  toggleFeedbackFlag = entry => () => {
    console.log('flagging feedback for entry:', entry);
    axios.put('/feedback/flag', entry)
    .then(response => {
      console.log('/feedback/flag success');
      this.getFeedbackFromServer();
    }).catch(error => console.log('/feedback/flag error:', error));
  };

  deleteFeedback = id => {
    console.log('deleting feedback with id:', id);
    axios.delete(`/feedback/${id}`)
    .then(response => {
      console.log('/feedback DELETE success for id:', id);
      this.setState({
        deleteConfirmedSnackbarIsOpen: true
      });
      this.getFeedbackFromServer();
    }).catch(error => {
      console.log('/feedback DELETE request error:', error);
      alert('Error deleting feedback!');
    });
  };

  openConfirmDeleteDialog = id => () => {
    this.setState({
      idToDelete: id,
      confirmDeleteDialogIsOpen: true
    });
  };

  handleConfirmDeleteDialogClose = deleteConfirmed => {
    const id = this.state.idToDelete;
    this.setState({
      confirmDeleteDialogIsOpen: false,
      idToDelete: undefined
    });
    if (deleteConfirmed) {
      this.deleteFeedback(id);
    } else {
      return;
    }
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item sm={10}>
          <Paper style={{marginTop: '40px', padding: '20px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feedback Date</TableCell>
                  <TableCell numeric>Feeling</TableCell>
                  <TableCell numeric>Understanding</TableCell>
                  <TableCell numeric>Support</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Flagged</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.feedback.map(entry => (
                  <TableRow key={entry.id}>
                    <TableCell>{moment(entry.date).format('M/D/YYYY, h:mm A')}</TableCell>
                    <TableCell numeric>{entry.feeling}</TableCell>
                    <TableCell numeric>{entry.understanding}</TableCell>
                    <TableCell numeric>{entry.support}</TableCell>
                    <TableCell>{entry.comments}</TableCell>
                    <TableCell>
                      <Checkbox 
                        checked={entry.flagged}
                        onChange={this.toggleFeedbackFlag(entry)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button color="secondary" onClick={this.openConfirmDeleteDialog(entry.id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <ConfirmDeleteDialog 
          open={this.state.confirmDeleteDialogIsOpen}
          onClose={this.handleConfirmDeleteDialogClose}
        />
        <MessageSnackbar 
          open={this.state.deleteConfirmedSnackbarIsOpen}
          onClose={() => this.setState({deleteConfirmedSnackbarIsOpen: false})}
          message="Feedback deleted."
        />
      </Grid>
    );
  }
}

export default AdminView;