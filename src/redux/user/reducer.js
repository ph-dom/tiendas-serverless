let userReducerDefaultState = {
    uid: null,
    fullName: null,
    email: null
};

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data;
        case 'LOGOUT_USER':
            return userReducerDefaultState;
        default:
            return state;
    }
};

export default userReducer;