import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../config/firebase';
import { loginUser, logoutUser } from '../../redux/user/actions';
import { openSnackbar } from '../../redux/snackbar/actions';
import { startGetUserStore } from '../../redux/store/actions';
import { openModal } from '../../redux/modal/action';
import AppBarComponent from './appbar';
import SnackbarComponent from './snackbar';
import LoadingComponent from './loading';
import ModalComponent from './modal';

class BaseComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            appLoaded: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(this.handleAuthStateChange);
    }

    handleAuthStateChange = (user) => {
        if(user) {
            this.props.loginUser(user.uid);
            this.props.startGetUserStore(() => {
                this.props.openModal('Error al acceder a los datos de tienda.');
            });
            this.props.history.push('/');
            this.props.openSnackbar(`Has ingresado como: ${user.email}.`);
        } else {
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
    loginUser: (uid) => dispatch(loginUser(uid)),
    logoutUser: () => dispatch(logoutUser()),
    openSnackbar: (message) => dispatch(openSnackbar(message)),
    openModal: (message) => dispatch(openModal(message)),
    startGetUserStore: (errorCallback) => dispatch(startGetUserStore(errorCallback))
});

const BaseComponentWithRouter = withRouter(BaseComponent);

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponentWithRouter);