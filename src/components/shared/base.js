import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebaseApp from '../../config/firebase';
import { loginUser, logoutUser } from '../../redux/user/actions';
import { openSnackbar } from '../../redux/snackbar/actions';
import AppBarComponent from './appbar';
import SnackbarComponent from './snackbar';
import LoadingComponent from './loading';
import GoogleMapComponent from './googlemap';

class BaseComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            snackbar: {
                open: false,
                severity: null,
                message: null
            },
            appLoaded: false
        }
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(this.handleAuthStateChange);
    }

    handleToggleStackbar = ({ open, severity, message }) => {
        this.setState({
            snackbar: {
                open,
                severity,
                message
            }
        });
    }

    handleAuthStateChange = (user) => {
        if(user) {
            this.props.loginUser(user.uid);
            this.props.history.push('/');
            this.props.openSnackbar({
                open: true,
                color: 'success',
                message: `Has ingresado como: ${user.email}.`
            });
        } else {
            this.props.logoutUser();
            this.props.history.push('/login');
            this.props.openSnackbar({
                open: true,
                color: 'success',
                message: 'Sesión cerrada.'
            });
        }
        !this.state.appLoaded && this.setState({
            appLoaded: true
        });
    };
    
    render() {
        const auth = this.props.auth;
        let display = this.props.location.pathname === '/' ? 'block' : 'none';
        if(this.state.appLoaded) {
            return (
                <React.Fragment>
                    {auth && <AppBarComponent /> }
                    <GoogleMapComponent display={display} />
                    {this.props.children}
                    <SnackbarComponent />
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
    openSnackbar: (state) => dispatch(openSnackbar(state))
});

const BaseComponentWithRouter = withRouter(BaseComponent);

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponentWithRouter);