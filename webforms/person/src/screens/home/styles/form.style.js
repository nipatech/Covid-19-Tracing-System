import styled from "styled-components";

import covidImage from "../../../images/covid.png";

const FormWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  
  .container-login{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: #ebeeef;
  }
  .wrapper-login{
    width: 670px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    .login-header{
      width: 100%;
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      padding: 70px 15px 74px 15px;
      /* height: 260px; */
      background-image: url(${covidImage});

      &::before{
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(54,84,99,0.7);
      }

      span{
        font-size: 30px;
        color: #fff;
        text-transform: uppercase;
        line-height: 1.2;
        text-align: center;
      }
    }

    .login-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: auto 30px;
      padding: 30px;
      .MuiTextField-root{
        width: 100%;
        margin-bottom: 30px;
      }
    }

    .account-helper{
      margin-top: 10px;
      span{
        cursor: pointer;
        font-weight: bold;
      }
    }
  }

  @media screen and (max-width: 576px){
    .wrapper-login{
      width: 90%;
      .login-form{
        margin: 0 auto;
        padding: 15px;
      }
    }

    .account-helper{
      display: block;
      width: 100%;
    }
  }
`

export default FormWrapper;