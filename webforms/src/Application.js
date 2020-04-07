import React from 'react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import { store, history } from './store/configureStore';

import Route from './router';
import Layout from "./Layout";

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Route />
      </Layout>
    </ConnectedRouter>
  </Provider>
)