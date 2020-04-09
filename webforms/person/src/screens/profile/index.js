import { connect } from 'react-redux';

import ProfileContainer from './container';

/** Dummy Data */
const firstName     = "Jampz"
const middleName    = "Ay"
const lastName      = "Baliw"
const contactNo     = "+639222312321"
const caseId        = "s3da5f465dsa4f56"


const mapStateToProps = () => ({
    firstName       : firstName,
    middleName      : middleName,
    lastName        : lastName,
    contactNo       : contactNo,
    caseId          : caseId,
});

const actionCreators = {
  
};

export default connect(mapStateToProps,actionCreators)(ProfileContainer);