import {
	compose,
	createStore,
	applyMiddleware
} from 'redux';

import reduxThunk from 'redux-thunk';
import reducers from './Reducers';

const store = compose(
	applyMiddleware(reduxThunk),
)(createStore)(reducers);

export default store;