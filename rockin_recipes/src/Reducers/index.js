import {combineReducers} from 'redux';
import {reducer as formReducer, reducer as recipeReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    recipeID: recipeReducer
});

export default rootReducer;