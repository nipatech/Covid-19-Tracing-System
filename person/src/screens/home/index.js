import { connect } from 'react-redux';

import Container from './container';

import onClickAdd from './handlers/onClickAdd';
import onClickMinus from './handlers/onClickMinus';

const mapStateToProps = (state) => ({
  counter: state.screen.Home.counter
});

const actionCreators = {
  onClickAdd,
  onClickMinus
};

export default connect(mapStateToProps,actionCreators)(Container);