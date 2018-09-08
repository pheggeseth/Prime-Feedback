import React, { Component } from 'react';
// import { connect } from 'react-redux';
import axios from 'axios';

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: []
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

  deleteFeedback = id => () => {
    console.log('deleting feedback with id:', id);
  };

  render() {
    const sortedFeedback = [...this.state.feedback].sort((a,b) => a.date - b.date);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Feeling</th>
              <th>Understanding</th>
              <th>Support</th>
              <th>Comments</th>
              <th>Flagged</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sortedFeedback.map(entry => (
              <tr key={entry.id}>
                <td>{entry.feeling}</td>
                <td>{entry.understanding}</td>
                <td>{entry.support}</td>
                <td>{entry.comments}</td>
                <td><input type="checkbox" checked={entry.flagged} onChange={this.toggleFeedbackFlag(entry)}/>{`${entry.flagged}`}</td>
                <td><button onClick={this.deleteFeedback(entry.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// const mapReduxStateToProps = reduxState => ({reduxState});
// export default connect(mapReduxStateToProps)(AdminView);
export default AdminView;