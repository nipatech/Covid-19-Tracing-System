import { connect } from 'react-redux';
import ContactContainer from './container';

const info = localStorage.getItem("token");
const details = JSON.parse(info).signInUserSession.idToken.payload;

const mapStateToProps = (state) => ({
    details : details
});

export default connect(mapStateToProps)(ContactContainer);