const nearbyProductsReducerDefaultState = [];

const nearbyProductsReducer = (state = nearbyProductsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_NEARBY_PRODUCTS':
            return action.data;
        case 'LOGOUT_USER':
            return nearbyProductsReducerDefaultState;
        default:
            return state;
    }
};

export default nearbyProductsReducer;