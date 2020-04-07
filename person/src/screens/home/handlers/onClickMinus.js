import { setCounterMinus } from '../state/counter';

export default () => async (dispatch) => dispatch(setCounterMinus(1))