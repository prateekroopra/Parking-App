import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools'

const composeEnhancers = composeWithDevTools({ 
  realtime: false,
  port: 8000
});

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware( logger,thunk ),
));
