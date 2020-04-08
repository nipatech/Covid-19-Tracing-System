import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom';

import Error404 from "./Error404";

const Home = lazy(() => import('./screens/home'));
const Signup = lazy(() => import("./screens/signup"));
const Contacts = lazy(() => import("./screens/contacts"));
const Profile = lazy(() => import("./screens/profile"));

const LoadingMessage = () => <div>loading...</div>

export const PublicRoute = () => (

  <Suspense fallback={<LoadingMessage />}>

    <Switch>

      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={Error404} />
      
    </Switch>

  </Suspense>
)

export const PrivateRoute = () => (

  <Suspense fallback={<LoadingMessage />}>

    <Switch>

      <Route path="/contacts" component={Contacts} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={Error404} />

    </Switch>

  </Suspense>

)
