import { createAction, handleActions } from 'redux-actions';

const defaultState = false;

export const setIsLoading = createAction('SCREENS/HOME/SET_COUNTER_PLUS');

export const reducer = handleActions(
  {
    [setIsLoading]: (state, action) => action.payload
  },
  defaultState
);

export default { setIsLoading, reducer };