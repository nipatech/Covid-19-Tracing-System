import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Button,

  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider
} from '@material-ui/core';

import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";
import RssFeedIcon from "@material-ui/icons/RssFeedOutlined";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";

import FormWrapper from "./styles/form.style";

function Container (props) {
  const token = localStorage.getItem("token");
  const {componentDidMount, onClickLogin } = props;
  
  const [view, setView] = useState("info");

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
          
          { view === "sign-in" && (
            <div className="login-header-text">
              <p>COVID-19 TRACING SYSTEM</p>
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

                <Button className="register">
                  Register
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
                  label="Phone Number"
                  value={phoneNumberLogin}
                  inputProps={{
                    onInput: (event) => validatePhoneLogin(event)
                  }}
                />

                <Button className="register" onClick={onClickLogin}>
                  Sign In
                </Button>

                <div className="account-helper">
                  No Account? <span onClick={() => setView("register")}>Register</span>
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