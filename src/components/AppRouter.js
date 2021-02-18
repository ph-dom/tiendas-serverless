import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseComponent from './shared/base';
import HomeComponent from './home/HomeComponent';
import SigninComponent from './signin/SigninComponent';
import LoginComponent from './login/LoginComponent';
import StoreComponent from './store/StoreComponent';
import ProductsComponent from './product/ProductsComponent';
import StorePageComponent from './storepage/StorePageComponent';

const AppRouter = ({ isAuthenticated }) => (
    <BrowserRouter>
        <BaseComponent>
            <Switch>
                <PrivateRoute isAuthenticated={isAuthenticated} path="/" exact component={HomeComponent} />
                <PrivateRoute isAuthenticated={isAuthenticated} path="/mitienda" exact component={StoreComponent} />
                <PrivateRoute isAuthenticated={isAuthenticated} path={["/mitienda/producto","/mitienda/producto/:idProduct"]} exact component={ProductsComponent} />
                <PrivateRoute isAuthenticated={isAuthenticated} path="/tienda/:idStore" component={StorePageComponent}/>
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