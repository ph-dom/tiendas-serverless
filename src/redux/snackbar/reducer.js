let snackbarReducerDefaultState = {
    open: false,
    message: null,
    severity: null
};

const snackbarReducer = (state = snackbarReducerDefaultState, action) => {
    switch(action.type) {
        case 'OPEN_SNACKBAR':
            return {
                ...state,
                ...action.data
            };
        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export default snackbarReducer;