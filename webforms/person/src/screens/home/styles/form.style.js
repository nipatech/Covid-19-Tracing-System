import styled from "styled-components";

import covidImage from "../../../images/covid.png";

const FormWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  p{
    font-size: 17px;
    font-weight: bold;
  }
  .login-header-text{
    p{
      padding: 15px 50px;
      color: #2366cb;
    }
  }
  ul {
    width: 100%;
    li {
      padding-left: 0;

      svg{
        font-size: 54px;
        margin-right: 20px;
        color: #3f51b5;

        &.rss-feed{
          color: #f27025;
        }
      }

      .local-phone-avatar{
        width: 56px;
        height: 56px;
        margin-right: 20px;
        background-color: #81c3e1;
        svg{
          font-size: 39px;
          color: white;
          margin-right: 0;
        }
      }
    }
  }
  .register{
    margin-top: 20px;
    width: 100%;
    border: 1px solid gray;
    margin-bottom: 20px;
  }
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
    width: 440px;
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
      &.no-padding{
        padding-top: 0;
      }
      .MuiTextField-root{
        width: 100%;
        margin-bottom: 15px;

        &.code{
          width: calc(100%/6 - 15px);
          input{
            text-align: center;
          }
        }
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

  .progress{
    width: 24px !important;
    height: 24px !important;
    position: absolute;
    right: 50px;
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