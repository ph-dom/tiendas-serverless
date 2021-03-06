import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../config/firebase';
import { loginUser, logoutUser } from '../../redux/user/actions';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startGetUserStore } from '../../redux/store/actions';
import { openModal } from '../../redux/modal/action';
import { startGetCurrentLocation } from '../../redux/location/actions';
import { startGetNearbyStores } from '../../redux/nearbystores/actions';
import { startGetUserRequests } from '../../redux/userrequests/actions';
import { startGetStoreRequests } from '../../redux/storerequests/actions';
import AppBarComponent from './appbar';
import SnackbarComponent from './snackbar';
import LoadingComponent from './loading';
import ModalComponent from './modal';

class BaseComponent extends React.Component {
    unsubscribeStoreRequests = () => null;
    unsubscribeUserRequests = () => null;

    constructor(props){
        super(props);
        this.state = {
            appLoaded: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(this.handleAuthStateChange);
    }

    handleAuthStateChange = async (user) => {
        if(user) {
            this.props.loginUser({
                uid: user.uid,
                fullName: user.displayName,
                email: user.email
            });
            await this.props.startGetCurrentLocation();
            await this.props.startGetNearbyStores();
            await this.props.startGetUserStore();
            this.unsubscribeUserRequests = this.props.startGetUserRequests();
            this.unsubscribeStoreRequests = this.props.startGetStoreRequests();
            this.props.openSnackbar(`Has ingresado como: ${user.email}.`);
        } else {
            this.unsubscribeUserRequests();
            this.unsubscribeStoreRequests();
            this.props.logoutUser();
            this.props.history.push('/login');
            this.props.openSnackbar('Sesión cerrada.');
        }
        if(!this.state.appLoaded) {
            this.setState({
                appLoaded: true
            });
        }
    };
    
    render() {
        const auth = this.props.auth;
        if(this.state.appLoaded) {
            return (
                <React.Fragment>
                    {auth && <AppBarComponent history={this.props.history} /> }
                    {this.props.children}
                    <SnackbarComponent />
                    <ModalComponent />
                </React.Fragment>
            );
        } else {
            return (
                <LoadingComponent />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.user.uid !== null
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (userData) => dispatch(loginUser(userData)),
    logoutUser: () => dispatch(logoutUser()),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    openModal: (message) => dispatch(openModal(message)),
    startGetUserStore: () => dispatch(startGetUserStore()),
    startGetCurrentLocation: () => dispatch(startGetCurrentLocation()),
    startGetStoreRequests: () => dispatch(startGetStoreRequests()),
    startGetNearbyStores: () => dispatch(startGetNearbyStores()),
    startGetUserRequests: () => dispatch(startGetUserRequests())
});

const BaseComponentWithRouter = withRouter(BaseComponent);

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponentWithRouter);