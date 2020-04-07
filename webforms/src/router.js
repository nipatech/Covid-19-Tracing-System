import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./screens/home'));

const LoadingMessage = () => <div>loading...</div>

export default () => (

  <Suspense fallback={<LoadingMessage />}>

    <Switch>

      <Route path="/" exact component={Home} />

    </Switch>

  </Suspense>

);
