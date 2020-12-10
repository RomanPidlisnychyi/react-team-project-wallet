import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticateSelector } from '../../redux/auth/authSelectors';

const RestrictedRoute = ({ component, redirect, ...props }) => {
  const isAuthenticate = useSelector(isAuthenticateSelector);

  return isAuthenticate ? (
    <Redirect to={redirect} />
  ) : (
    <Route {...props} component={component} />
  );
};

export default RestrictedRoute;
