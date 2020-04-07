import { createAction, handleActions } from 'redux-actions';

const defaultState = 0;

export const setCounterPlus = createAction('SCREENS/HOME/SET_COUNTER_PLUS');
export const setCounterMinus = createAction('SCREENS/HOME/SET_COUNTER_MINUS');

export const reducer = handleActions(
  {
    [setCounterPlus]: (state, action) => state + action.payload,
    [setCounterMinus]: (state, action) => state - action.payload,
  },
  defaultState
);

export default { setCounterPlus, setCounterMinus, reducer };