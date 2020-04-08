import { connect } from 'react-redux';

import Container from './container';

import componentDidMount from "./handlers/componentDidMount";
import onClickLogin from "./handlers/onClickLogin";

const mapStateToProps = (state) => ({
  loading: state.screen.Home.loading
});

const actionCreators = {
  componentDidMount,
  onClickLogin
};

export default connect(mapStateToProps,actionCreators)(Container);