const nearbyStoresReducerDefaultState = [];

const nearbyStoresReducer = (state = nearbyStoresReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_NEARBY_STORES':
            return action.data;
        case 'LOGOUT_USER':
            return nearbyStoresReducerDefaultState;
        default:
            return state;
    }
};

export default nearbyStoresReducer;