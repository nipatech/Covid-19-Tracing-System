import { combineReducers } from "redux";

import { reducer as counter } from './state/counter';

export default combineReducers({
  counter
});