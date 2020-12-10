import React, { useEffect, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import RestrictedRoute from './component/RestrictedRoute/PrivateRoute';
import Loader from './component/Loader';
import { getTokenFromStorage } from './redux/auth/authOperations';

import './fonts/fonts.css';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token !== 'undefined') {
      dispatch(getTokenFromStorage());
    }
  });

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={lazy(() => import('./views/HomePage/HomePage'))}
        />
        <PrivateRoute
          exact
          path="/stats"
          component={lazy(() =>
            import('./views/StatisticsPage/StatisticsPage'),
          )}
        />
        <PrivateRoute
          exact
          path="/currencies"
          component={lazy(() =>
            import('./views/CurrenciesPage/CurrenciesPage'),
          )}
        />
        <RestrictedRoute
          exact
          path="/login"
          redirect="/"
          component={lazy(() => import('./views/SignIn/SignIn'))}
        />
        <RestrictedRoute
          exact
          path="/registration"
          redirect="/login"
          component={lazy(() => import('./views/SignUp/SignUp'))}
        />
      </Switch>
    </Suspense>
  );
};

export default App;
