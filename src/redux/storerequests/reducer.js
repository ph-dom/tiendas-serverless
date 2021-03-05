const storeRequestsReducerDefaultState = [];

const storeRequestsReducer = (state = storeRequestsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_STORE_REQUESTS':
            return action.data;
        case 'LOGOUT_USER':
            return storeRequestsReducerDefaultState;
        default:
            return state;
    }
};

export default storeRequestsReducer;