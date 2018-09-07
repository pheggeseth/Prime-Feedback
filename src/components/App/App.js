import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Header from '../Header/Header.js';
import FeelingView from '../views/form/FeelingView/FeelingView.js';
import UnderstandingView from '../views/form/UnderstandingView/UnderstandingView.js';
import SupportView from '../views/form/SupportView/SupportView.js';
import CommentsView from '../views/form/CommentsView/CommentsView.js';
import SuccessView from '../views/form/SuccessView/SuccessView.js';
import AdminView from '../views/AdminView/AdminView.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/form/feeling" component={FeelingView} />
          <Route path="/form/understanding" component={UnderstandingView} />
          <Route path="/form/support" component={SupportView} />
          <Route path="/form/comments" component={CommentsView} />
          <Route path="/form/success" component={SuccessView} />
          <Route path="/admin" component={AdminView} />
        </div>
      </Router>
    );
  }
}

export default App;
