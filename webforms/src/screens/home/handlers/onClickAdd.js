import { setCounterPlus } from '../state/counter';

export default () => async (dispatch) => dispatch(setCounterPlus(1))