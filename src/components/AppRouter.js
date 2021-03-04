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
import RequestComponent from './request/RequestComponent';

const AppRouter = () => (
    <BrowserRouter>
        <BaseComponent>
            <Switch>
                <PrivateRoute path="/" exact component={HomeComponent} />
                <PrivateRoute path="/mitienda" exact component={StoreComponent} />
                <PrivateRoute path={["/mitienda/producto","/mitienda/producto/:idProduct"]} exact component={ProductsComponent} />
                <PrivateRoute path="/mis-solicitudes" component={RequestComponent}/>
                <PrivateRoute path="/tienda/:idStore" component={StorePageComponent}/>
                <PublicRoute path="/signin" component={SigninComponent} />
                <PublicRoute path="/login" component={LoginComponent} />
                <Route path="*" component={() => <h1>Not Found</h1>} />
            </Switch>
        </BaseComponent>
    </BrowserRouter>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.uid !== null
});

const PrivateRoute = connect(mapStateToProps)(
    ({ isAuthenticated, ...rest }) =>  {
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
);

const PublicRoute = connect(mapStateToProps)(
    ({ isAuthenticated, ...rest }) => {
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
);

export default AppRouter;