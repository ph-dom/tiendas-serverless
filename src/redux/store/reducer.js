const storeReducerDefaultState = {};

const storeReducer = (state = storeReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_USER_STORE':
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
};

export default storeReducer;

