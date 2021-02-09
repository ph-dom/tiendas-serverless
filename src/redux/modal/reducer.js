let modalReducerDefaultState = {
    open: false,
    message: null
}

const modalReducer = (state = modalReducerDefaultState, action) => {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                ...action.data
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export default modalReducer;