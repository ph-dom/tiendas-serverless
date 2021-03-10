const nearbyProductsReducerDefaultState = [];

const nearbyProductsReducer = (state = nearbyProductsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_NEARBY_PRODUCTS':
            return action.data;
        case 'LIKE_NEARBY_PRODUCT':
            return state.map(product => {
                if(product.id === action.data.idProduct) {
                    let likes = product.likes ? product.likes : [];
                    likes.push(action.data.uid);
                    return {
                        ...product,
                        likes
                    };
                }
                return product;
            });
        case 'DISLIKE_NEARBY_PRODUCT':
            return state.map(product => {
                if(product.id === action.data.idProduct) {
                    return {
                        ...product,
                        likes: product.likes.filter(like => like !== action.data.uid)
                    };
                }
                return product;
            });
        case 'LOGOUT_USER':
            return nearbyProductsReducerDefaultState;
        default:
            return state;
    }
};

export default nearbyProductsReducer;