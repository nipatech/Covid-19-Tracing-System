import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';

import {
  TextField,
  Button,

  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Snackbar,
  IconButton
} from '@material-ui/core';

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";
import RssFeedIcon from "@material-ui/icons/RssFeedOutlined";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import CloseIcon from '@material-ui/icons/Close';


import FormWrapper from "./styles/form.style";

function Container (props) {
  const token = localStorage.getItem("token");
  const {componentDidMount } = props;
  
  const [view, setView] = useState("info");

  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumberLogin, setPhoneNumberLogin] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    caseID: ""
  });

  const [code, setCode] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [cognitoUser, setCognitoUser] = useState(null);

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: ""
  });

  useEffect(() => { 
    componentDidMount();

    Amplify.configure({
      Auth: {
        region: "us-east-1",
        userPoolId: "us-east-1_0ALSymhqt",
        userPoolWebClientId: "2ti454ncsvu168ic6099da8d2i"
      }
    });

    Auth.signOut();
  }, [])

  const handleChange = name => event => setState({...state, [name]: event.target.value});

  const handleChangeCode = name => event => {
    setCode({...code, [name]: event.target.value.replace(/[^0-9]/g, '')});

    if (name === "a" && event.target.value !== ""){ document.getElementById("code-b").focus(); }
    if (name === "b" && event.target.value !== ""){ document.getElementById("code-c").focus(); }
    if (name === "c" && event.target.value !== ""){ document.getElementById("code-d").focus(); }
    if (name === "d" && event.target.value !== ""){ document.getElementById("code-e").focus(); }
    if (name === "e" && event.target.value !== ""){ document.getElementById("code-f").focus(); }
    if (name === "f" && event.target.value !== ""){ document.getElementById("verify-login").focus(); }
  }
  
  const validatePhoneReg = (event) => {
    setState({...state, "phoneNumber": event.target.value.replace(/[^0-9+\s]/g, '') })
  };

  const validatePhoneLogin = (event) => {
    setPhoneNumberLogin(event.target.value.replace(/[^0-9+\s]/g, ''))
  };

  const onClickRegister = async () => {

    setSubmitting(true);
    axios.post("https://xgmcrilfq1.execute-api.us-east-1.amazonaws.com/COVID/register", {
      pn: state.phoneNumber,
      fn: state.firstName,
      ln: state.lastName,
      cid: state.caseID
    }).then(response => {
      console.log(response)
      if (response.data.errorMessage && response.data.errorMessage === "An account with the given phone_number already exists."){
        setSnackBar({ open: true, message: "Phone number already registered."})
      } else {
        setView("verify-registration") 
      }
      setSubmitting(false);
    }).catch(error => {
      console.log(error)
      setSubmitting(false);
    });
  };

  const onClickVerifyReg = async () => {
    setSubmitting(true);
    axios.post("https://xgmcrilfq1.execute-api.us-east-1.amazonaws.com/COVID/confirm-user", {
      pn: state.phoneNumber,
      cc: `${code.a}${code.b}${code.c}${code.d}${code.e}${code.f}`
    }).then(response => {
      console.log(response)
      Auth.signIn(state.phoneNumber)
      .then(success => {
        localStorage.setItem("token", success);
        window.location = "/profile";
      })
    }).catch(error => {
      console.log(error)
      setSubmitting(false);
    });
  };

  const onClickLogin = async () => {
    setSubmitting(true);
    Auth.signIn(phoneNumberLogin)
    .then(success => {
      console.log(success)
      setCognitoUser(success);
      setView("verify-login");
      setSubmitting(false);
      document.getElementById("code-a").focus();
    })
    .catch(err => {
      console.log(err)
      setSubmitting(false);
    });
  }

  const onClickVerifyLogin = async () => {
    setSubmitting(true);
    Auth.sendCustomChallengeAnswer(cognitoUser, `${code.a}${code.b}${code.c}${code.d}${code.e}${code.f}`)
    .then(response => {
      localStorage.setItem("token", JSON.stringify(cognitoUser));
      window.location = "/contacts";
      setSubmitting(false);
    }).catch(error => {
      setSubmitting(false);
    })
  }

  const validateReg = () => {
    if (
      !/^(\+639)\d{9}$/.test(state.phoneNumber) ||
      state.firstName.trim().length === 0 || 
      state.lastName.trim().length === 0 || 
      state.caseID.trim().length === 0 
    ) { return true; }

    return false
  }

  const validatePHPhoneNumber = (phone) => /^(\+639)\d{9}$/.test(phone) ? false : true;

  if (token) return null;

  return(
    <FormWrapper >
      
      <div className="container-login">
        
        <div className="wrapper-login">
          
          { view === "sign-in" && (
            <div className="login-header-text">
              <p>COVID-19 CONTACT TRACING SERVICE</p>
              <Divider />
            </div>
          )}
 
          <div className={`login-form ${view === "sign-in" ? "no-padding": ""}`}>

            {view === "info" && (
              <Fragment>
                
                <p>
                  Take a part to stop the spread of COVID-19
                </p>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <InfoOutlinedIcon />
                    </ListItemAvatar>
                    <ListItemText primary="This site will let you register your personal information to government database." />
                  </ListItem>

                  <ListItem>
                    <ListItemAvatar>
                      <AccountCircleIcon />
                    </ListItemAvatar>
                    <ListItemText primary="You can submit information of person's you have contact with." />
                  </ListItem>


                  <ListItem>
                    <ListItemAvatar>
                      <RssFeedIcon className="rss-feed" />
                    </ListItemAvatar>
                    <ListItemText primary="You will receive daily check-in message in the duration of quarantine period." />
                  </ListItem>
                </List>

                <Button className="register" onClick={() => setView("register")}>
                  Register
                </Button>

                <div className="account-helper">
                  Already registered? <span onClick={() => setView("sign-in")}>Sign In</span>
                </div>

              </Fragment>
            )}

            { view === "register" && (
              <Fragment>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="local-phone-avatar">
                        <LocalPhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Enter your phone number to register." />
                  </ListItem>
                </List>

                <TextField
                  id="phone"
                  label="Philippines (+63)"
                  value={state.phoneNumber}
                  inputProps={{
                    onInput: (event) => validatePhoneReg(event)
                  }}
                />

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
                  id="caseID"
                  label="Case ID"
                  value={state.caseID}
                  onChange={handleChange("caseID")}
                />

                <Button className="register" onClick={onClickRegister} disabled={submitting || validateReg()}>
                  Submit
                  {submitting && (
                    <CircularProgress className="progress"/>
                  )}
                </Button>

                <div className="account-helper">
                  Already registered? <span onClick={() => setView("sign-in")}>Sign In</span>
                </div>

              </Fragment>
            )}

            { view === "sign-in" && (
              <Fragment>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className="local-phone-avatar">
                        <LocalPhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Enter your phone number to continue." />
                  </ListItem>
                </List>

                <TextField 
                  id="phone"
                  label="Philippines (+63)"
                  value={phoneNumberLogin}
                  inputProps={{
                    onInput: (event) => validatePhoneLogin(event)
                  }}
                />

                <Button className="register" onClick={onClickLogin} disabled={submitting || validatePHPhoneNumber(phoneNumberLogin)}>
                  Sign In
                  {submitting && (
                    <CircularProgress className="progress"/>
                  )}
                </Button>

                <div className="account-helper">
                  No Account? <span onClick={() => setView("register")}>Register</span>
                </div>
              </Fragment>
            )}

            { view === "verify-registration" && (
              <Fragment>
                <List>
                  <ListItem>
                    <ListItemText primary="A 6-digit verification code is sent to you via sms, please enter code to verify your phone number." />
                  </ListItem>
                </List>

                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-a"
                  value={code.a}
                  name="code-a"
                  onChange={handleChangeCode("a")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-b"
                  name="code-b"
                  value={code.b}
                  onChange={handleChangeCode("b")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-c"
                  name="code-c"
                  value={code.c}
                  onChange={handleChangeCode("c")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-d"
                  name="code-d"
                  value={code.d}
                  onChange={handleChangeCode("d")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-e"
                  name="code-f"
                  value={code.e}
                  onChange={handleChangeCode("e")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-f"
                  name="code-f"
                  value={code.f}
                  onChange={handleChangeCode("f")}
                  inputProps={{
                    maxLength: 1
                  }}
                />

                <Button className="register" id="verify-login" onClick={onClickVerifyReg} disabled={submitting}>
                  Submit
                  {submitting && (
                    <CircularProgress className="progress"/>
                  )}
                </Button>

                <div className="account-helper">
                  Didn't receive the code? <span onClick={() => setView("register")}>Resend Code</span>
                </div>
              </Fragment>
            )}

            { view === "verify-login" && (
              <Fragment>
                <List>
                  <ListItem>
                    <ListItemText primary="A 6-digit verification code is sent to you via sms, please enter code to verify your phone number." />
                  </ListItem>
                </List>

                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-a"
                  value={code.a}
                  name="code-a"
                  onChange={handleChangeCode("a")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-b"
                  name="code-b"
                  value={code.b}
                  onChange={handleChangeCode("b")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-c"
                  name="code-c"
                  value={code.c}
                  onChange={handleChangeCode("c")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-d"
                  name="code-d"
                  value={code.d}
                  onChange={handleChangeCode("d")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-e"
                  name="code-f"
                  value={code.e}
                  onChange={handleChangeCode("e")}
                  inputProps={{
                    maxLength: 1
                  }}
                />
                <TextField 
                  className="code"
                  variant="outlined"
                  id="code-f"
                  name="code-f"
                  value={code.f}
                  onChange={handleChangeCode("f")}
                  inputProps={{
                    maxLength: 1
                  }}
                />

                <Button className="register" id="verify-login" onClick={onClickVerifyLogin} disabled={submitting}>
                  Submit
                  {submitting && (
                    <CircularProgress className="progress"/>
                  )}
                </Button>

                <div className="account-helper">
                  Didn't receive the code? <span onClick={() => setView("register")}>Resend Code</span>
                </div>
              </Fragment>
            )}
            
          </div>

        </div>
      </div>


      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        open={snackBar.open}
        onClose={() => setSnackBar({ open: false, message: ""})}
        message={snackBar.message}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => setSnackBar({ open: false, message: ""})}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </FormWrapper>
  )
}

Container.propTypes = {
  
}

export default Container;