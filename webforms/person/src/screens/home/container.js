import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Button
} from '@material-ui/core';

import FormWrapper from "./styles/form.style";

function Container (props) {
  const token = localStorage.getItem("token");
  const {componentDidMount, onClickLogin } = props;

  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumberLogin, setPhoneNumberLogin] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    caseID: ""
  });

  

  useEffect(() => { 
    componentDidMount()
  }, [])

  const handleChange = name => event => setState({...state, [name]: event.target.value});
  
  const validatePhoneReg = (event) => {
    setState({...state, "phoneNumber": event.target.value.replace(/[^0-9+\s]/g, '') })
  };

  const validatePhoneLogin = (event) => {
    setPhoneNumberLogin(event.target.value.replace(/[^0-9+\s]/g, ''))
  };

  if (token) return null;

  return(
    <FormWrapper >
      
      <div className="container-login">
        
        <div className="wrapper-login">
          <div className="login-header" />

          <div className="login-form">

            { isLogin ? (
              <Fragment>
                {/* <Button variant="contained" color="primary" onClick={onClickLogin}>
                  Login using Facebook
                </Button> */}

                <TextField 
                  id="phone"
                  label="Phone Number"
                  value={phoneNumberLogin}
                  inputProps={{
                    onInput: (event) => validatePhoneLogin(event)
                  }}
                />
                
                <Button variant="contained" color="primary" onClick={onClickLogin}>
                  Create OTP
                </Button>
                
                <div className="account-helper" onClick={() => setIsLogin(false)}>
                  Don't have an account? <span>Sign Up</span>
                </div>
            </Fragment>

            ): (
              <Fragment>
                <TextField
                  id="first-name"
                  label="First Name"
                  value={state.firstName}
                  onChange={handleChange("firstName")}
                />
                <TextField
                  id="last-name"
                  label="Last Name"
                  value={state.lastName}
                  onChange={handleChange("lastName")}
                />
                <TextField
                  id="phone"
                  label="Phone Number"
                  value={state.phoneNumber}
                  inputProps={{
                    onInput: (event) => validatePhoneReg(event)
                  }}
                />
                <TextField
                  id="caseID"
                  label="Case ID"
                  value={state.caseID}
                  onChange={handleChange("caseID")}
                />
                
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>

                <div className="account-helper">
                  Have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                </div>
              </Fragment>
            )}
          </div>

        </div>
      </div>

    </FormWrapper>
  )
}

Container.propTypes = {
  
}

export default Container;