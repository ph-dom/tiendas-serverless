const userRequestsReducerDefaultState = [];

const userRequestsReducer = (state = userRequestsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_USER_REQUESTS':
            return action.data;
        case 'ADD_USER_REQUESTS':
            return [
                ...state,
                action.data
            ];
        case 'LOGOUT_USER':
            return userRequestsReducerDefaultState;
        default:
            return state;
    }
};

export default userRequestsReducer;