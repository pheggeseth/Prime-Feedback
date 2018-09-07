import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import feeling from './redux/reducers/feeling.reducer';
import understanding from './redux/reducers/understanding.reducer';
import support from './redux/reducers/support.reducer';
import comments from './redux/reducers/comments.reducer';

const storeInstance = createStore(
 combineReducers({
   feeling,
   understanding,
   support,
   comments
 }),
 applyMiddleware(logger),
);


ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
