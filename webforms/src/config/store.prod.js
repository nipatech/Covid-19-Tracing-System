import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import defaultStore from './reducers';

const history = createBrowserHistory();

export default () => {

  const reducerMap  = {
    router: connectRouter(history),
    ...defaultStore
  }

  const enhancer    = applyMiddleware(thunkMiddleware, routerMiddleware(history));
  const rootReducer = combineReducers(reducerMap);

  const store = createStore(rootReducer, enhancer);


  return { store, history };
}