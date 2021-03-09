const nearbyStoresReducerDefaultState = [];

const nearbyStoresReducer = (state = nearbyStoresReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_NEARBY_STORES':
            return action.data;
        case 'LOGOUT_USER':
            return nearbyStoresReducerDefaultState;
        case 'LIKE_NEARBY_STORE':
            return state.map(store => {
                if(store.id === action.data.idStore) {
                    let likes = store.likes ? store.likes : [];
                    likes.push(action.data.uid);
                    return {
                        ...store,
                        likes
                    };
                }
                return store;
            });
        case 'DISLIKE_NEARBY_STORE':
            return state.map(store => {
                if(store.id === action.data.idStore) {
                    return {
                        ...store,
                        likes: store.likes.filter(like => like !== action.data.uid)
                    };
                }
                return store;
            });
        default:
            return state;
    }
};

export default nearbyStoresReducer;