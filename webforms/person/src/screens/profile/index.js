import { connect } from 'react-redux';

import ProfileContainer from './container';
/** Get details from local storage */
const info = localStorage.getItem("token");
const details = JSON.parse(info).signInUserSession.idToken.payload;

const fullname     = details.name
const contactNo     = details.phone_number
const caseId        = details["custom:caseID"]


const mapStateToProps = () => ({
    fullname       : fullname,
    contactNo       : contactNo,
    caseId          : caseId,
});

const actionCreators = {
  
};

export default connect(mapStateToProps,actionCreators)(ProfileContainer);