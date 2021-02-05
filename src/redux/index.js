import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';

const store = createStore(
    combineReducers({
        user: userReducer
    }),
    compose(applyMiddleware(thunk))
);

export default store;