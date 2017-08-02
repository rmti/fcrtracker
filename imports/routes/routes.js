import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import Signup from '../ui/Signup';
import FCRApp from '../ui/App';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Link from '../ui/Link';
import ClientsList from '../ui/ClientsList';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/fcr','/invoice','/client'];
const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/fcr');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/fcr');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/fcr" component={FCRApp} onEnter={onEnterPrivatePage}>
    <Route path="/invoice" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="/client" component={ClientsList} onEnter={onEnterPrivatePage}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
);
