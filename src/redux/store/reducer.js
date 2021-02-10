const storeReducerDefaultState = {};

const storeReducer = (state = storeReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_USER_STORE':
            return {
                ...state,
                ...action.data
            };
        case 'LOGOUT_USER':
            return storeReducerDefaultState;
        default:
            return state;
    }
};

export default storeReducer;

