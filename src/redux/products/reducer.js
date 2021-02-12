const productsReducerDefaultState = [];

const productsReducer = (state = productsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_PRODUCT':
            return [
                ...state,
                action.data
            ];
        case 'UPDATE_PRODUCT':
            return state.map(product => {
                if(product.id === action.data.idProduct) {
                    return {
                        ...product,
                        ...action.data.updates
                    };
                }
                return product;
            });
        case 'DELETE_PRODUCT':
            return state.filter(product => product.id !== action.data);
        case 'GET_PRODUCTS':
            return action.data;
        default:
            return state;
    }
};

export default productsReducer;