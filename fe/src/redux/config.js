import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import UserReducer from "./reducers/UserReducer"


const rootReducer = combineReducers({
    UserReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
