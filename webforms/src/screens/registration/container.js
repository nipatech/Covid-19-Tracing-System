import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Counter from './components/counter';

function Container (props) {

  return(
    <div style={{ textAlign: "center" }}>
      Boilerplate application, that uses react testing library, redux, react suspense, react lazy
      
      <Counter {...props} />

      <Link to="/second">Second</Link>

    </div>
  )
}

Container.propTypes = {
  counter: PropTypes.number.isRequired,

  onClickAdd: PropTypes.func.isRequired,
  onClickMinus: PropTypes.func.isRequired
}

export default Container;