import { connect } from 'react-redux';
import ContactContainer from './container';

const info = localStorage.getItem("token");
const details = JSON.parse(info).signInUserSession.idToken.payload;
const jwtToken = JSON.parse(info).signInUserSession.idToken.jwtToken;

const mapStateToProps = (state) => ({
    details : details,
    jwtToken : jwtToken,
});

export default connect(mapStateToProps)(ContactContainer);