import { connect } from 'react-redux';

import Container from './container';

const mapStateToProps = (state) => ({
  loading: state.screen.Home.loading
});

const actionCreators = {
  
};

export default connect(mapStateToProps,actionCreators)(Container);