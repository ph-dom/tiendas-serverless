import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import snackbarReducer from './snackbar/reducer';
import modalReducer from './modal/reducer';
import storeReducer from './store/reducer';

const store = createStore(
    combineReducers({
        user: userReducer,
        store: storeReducer,
        snackbar: snackbarReducer,
        modal: modalReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;