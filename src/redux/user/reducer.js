let userReducerDefaultState = {
    uid: null
}

const userReducer = (state = userReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                uid: action.data
            };
        case 'LOGOUT_USER':
            return userReducerDefaultState;
        default:
            return state;
    }
};

export default userReducer;