import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import snackbarReducer from './snackbar/reducer';
import modalReducer from './modal/reducer';

const store = createStore(
    combineReducers({
        user: userReducer,
        snackbar: snackbarReducer,
        modal: modalReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;