import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedDashboard } from './Dashboard'
import { store } from '../store';
import { history } from '../store/history';
import { Redirect } from 'react-router';
import { ConnectedNavigation } from './Navigation';
import { ConnectedLogin } from './Login';
import { ConnectedSignup } from './Signup';

const RouteGuard = Component => ({ match }) => {

    if (!store.getState().session.authenticated) {
        return <Redirect to="/" />;
    } else {
        return <Component match={match} />;
    }
}

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div className="container mt-3">
                <ConnectedNavigation />
                <Route
                    exact
                    path="/"
                    component={ConnectedLogin} />
                <Route exact
                    path="/dashboard"
                    render={RouteGuard(ConnectedDashboard)} />
                <Route exact path="/signup" component={ConnectedSignup} />
            </div>
        </Provider>
    </Router>
);