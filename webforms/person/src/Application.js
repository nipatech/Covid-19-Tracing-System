import React from 'react';

import { Provider } from 'react-redux';
import Amplify from '@aws-amplify/core';

import { ConnectedRouter } from "connected-react-router";
import { store, history } from './store/configureStore';

import { PublicRoute, PrivateRoute } from './router';
import Layout from "./Layout";

Amplify.configure({
  Auth: {
    region: process.env.REACT_AMPLIFY_REGION,
    userPoolId: process.env.REACT_AMPLIFY_POOL_ID,
    userPoolWebClientId: process.env.REACT_AMPLIFY_CLIENT_ID
  }
});

const token = localStorage.getItem("token");

export default () => (
  <Provider store={store}>

    <ConnectedRouter history={history}>

      { token ? (

        <Layout history={history}>

          <PrivateRoute />

        </Layout>

      ): <PublicRoute /> }

    </ConnectedRouter>

  </Provider>
)