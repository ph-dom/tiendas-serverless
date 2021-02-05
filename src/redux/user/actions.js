import app from '../../config/firebase';

export const loginUser = (uid) => ({
    type: 'LOGIN_USER',
    data: uid
});

export const startSigninUserEmail = (email, password) => {
    return () => {
        return app.auth().createUserWithEmailAndPassword(email, password);
    };
};

export const startLoginUser = (email, password) => {
    return () => {
        return app.auth().signInWithEmailAndPassword(email, password);
    };
};

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const startLogoutUser = () => {
    return () => {
        return app.auth().signOut();
    };
};