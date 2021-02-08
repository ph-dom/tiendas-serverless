import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import snackbarReducer from './snackbar/reducer';

const store = createStore(
    combineReducers({
        user: userReducer,
        snackbar: snackbarReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;