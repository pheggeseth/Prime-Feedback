import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Header from '../Header/Header.js';
import FeelingView from '../views/form/FeelingView/FeelingView.js';
import UnderstandingView from '../views/form/UnderstandingView/UnderstandingView.js';
import SupportView from '../views/form/SupportView/SupportView.js';
import CommentsView from '../views/form/CommentsView/CommentsView.js';
import SubmitView from '../views/form/SubmitView/SubmitView.js';
import SuccessView from '../views/form/SuccessView/SuccessView.js';
import AdminView from '../views/AdminView/AdminView.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSadCry, faFrown, faMeh, faSmile, faSmileBeam } from '@fortawesome/free-solid-svg-icons';

library.add(faSadCry, faFrown, faMeh, faSmile, faSmileBeam);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={() => <Redirect to="/form/feeling"/>} />
          <Route path="/form/feeling" component={FeelingView} />
          <Route path="/form/understanding" component={UnderstandingView} />
          <Route path="/form/support" component={SupportView} />
          <Route path="/form/comments" component={CommentsView} />
          <Route path="/form/submit" component={SubmitView} />
          <Route path="/form/success" component={SuccessView} />
          <Route path="/admin" component={AdminView} />
        </div>
      </Router>
    );
  }
}

export default App;
