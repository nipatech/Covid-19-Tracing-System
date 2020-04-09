import React from 'react';
import Amplify, { Auth } from '@aws-amplify/core';

import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import { store, history } from './store/configureStore';

import { PublicRoute, PrivateRoute } from './router';
import Layout from "./Layout";



const token = localStorage.getItem("token");

export default () => (
  <Provider store={store}>

    <ConnectedRouter history={history}>

      { token ? (

        <Layout>

          <PrivateRoute />

        </Layout>

      ): <PublicRoute /> }

    </ConnectedRouter>

  </Provider>
)