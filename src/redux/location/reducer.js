const locationReducerDefaultState = {};

const locationReducer = (state = locationReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_LOCATION':
            return action.data;
        default:
            return state;
    }
};

export default locationReducer;