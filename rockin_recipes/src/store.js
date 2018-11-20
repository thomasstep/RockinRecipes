import {
	compose,
	createStore,
	applyMiddleware,
    combineReducers
} from 'redux';
import reduxThunk from 'redux-thunk';
import { initialState, userReducer, usernameReducer } from "./redux/reducers.js"
import { loginUserAction, loginUsernameAction } from "./redux/actions.js"

const  rootReducer = combineReducers({
    user: userReducer
});

const store = compose(
	applyMiddleware(reduxThunk),
)(createStore)(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
