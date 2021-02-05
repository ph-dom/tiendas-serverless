import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebaseApp from '../../config/firebase';
import { loginUser, logoutUser } from '../../redux/user/actions';
import AppBarComponent from './appbar';
import SnackbarComponent from './snackbar';
import LoadingComponent from './loading';

export const StateContext = React.createContext();

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
        } else {
            this.props.logoutUser();
            this.props.history.push('/login');
        }
        !this.state.appLoaded && this.setState({
            appLoaded: true
        });
    };
    
    render() {
        const value = {
            snackbar: this.state.snackbar,
            handleToggleStackbar: this.handleToggleStackbar
        }
        const auth = this.props.auth;
        if(this.state.appLoaded) {
            return (
                <StateContext.Provider value={value}>
                    {auth && <AppBarComponent /> }
                    {this.props.children}
                    <SnackbarComponent />
                </StateContext.Provider>
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
    logoutUser: () => dispatch(logoutUser())
});

const BaseComponentWithRouter = withRouter(BaseComponent);

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponentWithRouter);