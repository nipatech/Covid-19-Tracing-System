import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Button
} from '@material-ui/core';

import FormWrapper from "./styles/form.style";

function Container (props) {
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);

  const {
    componentDidMount,
    onClickLogin
  } = props;

  useEffect(() => { 
    componentDidMount()
  }, [])

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

                <TextField id="phone" label="Phone Number" />
                <TextField id="password" label="Password" type="password" />

                <Button variant="contained" color="primary" onClick={onClickLogin}>
                  Login
                </Button>
                
                <div className="account-helper" onClick={() => setIsLogin(false)}>
                  Don't have an account? <span>Sign Up</span>
                </div>
            </Fragment>

            ): (
              <Fragment>
                <TextField id="first-name" label="First Name" />
                <TextField id="last-name" label="Last Name" />
                <TextField id="phone" label="Phone Number" />
                <TextField id="password" label="Password" type="password" />
                
                <Button variant="contained" color="primary" onClick={onClickLogin}>
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