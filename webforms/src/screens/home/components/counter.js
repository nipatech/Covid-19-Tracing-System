import React from 'react';
import PropTypes from 'prop-types';
import CounterWrapper from './styles/counter.style';

function Counter(props) {

  const {
    counter,
    onClickAdd,
    onClickMinus
  } = props;

  return(
    <CounterWrapper className="counter-wrapper">
      <p
        data-testid="counter"
      >
        { counter }
      </p>
      
      <button
        type="button"
        data-testid="minus"
        onClick={onClickMinus}
      >
        Minus
      </button>
      <button
        type="button"
        data-testid="add"
        onClick={onClickAdd}
      >
        Add
      </button>
    </CounterWrapper>
  )
}


Counter.propTypes = {
  counter: PropTypes.number.isRequired,

  onClickAdd: PropTypes.func.isRequired,
  onClickMinus: PropTypes.func.isRequired
}

export default Counter;