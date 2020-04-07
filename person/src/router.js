import React, { lazy, Suspense, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('./screens/home'));
const Signup = lazy(() => import("./screens/signup"));
const Contacts = lazy(() => import("./screens/contacts"));
const Profile = lazy(() => import("./screens/profile"));

const LoadingMessage = () => <div>loading...</div>

export default () => (

  <Suspense fallback={<LoadingMessage />}>

    <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/profile" component={Profile} />

    </Switch>

  </Suspense>

);
