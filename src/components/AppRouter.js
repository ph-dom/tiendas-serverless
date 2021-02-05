import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseComponent from './shared/base';
import HomeComponent from './home/HomeComponent';
import SigninComponent from './signin/SigninComponent';
import LoginComponent from './login/LoginComponent';

const AppRouter = ({ isAuthenticated }) => (
    <BrowserRouter>
        <BaseComponent>
            <Switch>
                <PrivateRoute isAuthenticated={isAuthenticated} path="/" exact component={HomeComponent} />
                <PublicRoute isAuthenticated={isAuthenticated} path="/signin" component={SigninComponent} />
                <PublicRoute isAuthenticated={isAuthenticated} path="/login" exact component={LoginComponent} />
                <Route path="*" component={() => <h1>Not Found</h1>} />
            </Switch>
        </BaseComponent>
    </BrowserRouter>
);

const PrivateRoute = ({ isAuthenticated, ...rest }) =>  {
    if (isAuthenticated) {
        return (
            <Route {...rest} />
        );
    } else {
        return (
            <Route {...rest} component={() => <Redirect to="/login" />} />
        );
    }
}

const PublicRoute = ({ isAuthenticated, ...rest }) => {
    if (isAuthenticated) {
        return (
            <Route {...rest} component={() => <Redirect to="/" />} />
        );
    } else {
        return (
            <Route {...rest}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.uid !== null
});

export default connect(mapStateToProps)(AppRouter);