import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import defaultStore from './reducers';

const windowGlobal = typeof window !== 'undefined' && window
const history = createBrowserHistory();

export default () => {

  const reducerMap  = {
    router: connectRouter(history),
    ...defaultStore
  }
  
  const rootReducer = combineReducers(reducerMap);
  const enhancers = applyMiddleware(thunkMiddleware, routerMiddleware(history));
  const composeEnhancers = windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;
  const enhancer = composeEnhancers(enhancers);
  const store = createStore(rootReducer,enhancer);

  return { store, history };
}