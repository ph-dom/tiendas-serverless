import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import snackbarReducer from './snackbar/reducer';
import modalReducer from './modal/reducer';
import storeReducer from './store/reducer';
import producsReducer from './products/reducer';
import nearbyStoresReducer from './nearbystores/reducer';
import locationReducer from './location/reducer';

const store = createStore(
    combineReducers({
        user: userReducer,
        store: storeReducer,
        snackbar: snackbarReducer,
        modal: modalReducer,
        products: producsReducer,
        nearbyStores: nearbyStoresReducer,
        location: locationReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;