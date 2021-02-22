import { auth } from '../../config/firebase';

export const loginUser = ({ uid, fullName, email }) => ({
    type: 'LOGIN_USER',
    data: {
        uid,
        fullName,
        email
    }
});

export const startSigninUserEmail = (fullName, email, password) => {
    return () => {
        return auth.createUserWithEmailAndPassword(email, password).then(sign => {
            return sign.user.updateProfile({
                displayName: fullName
            });
        });
    };
};

export const startLoginUser = (email, password, errorCallback) => {
    return () => {
        return auth.signInWithEmailAndPassword(email, password).catch(error => {
            errorCallback()
        });
    };
};

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});

export const startLogoutUser = () => {
    return () => {
        return auth.signOut();
    };
};