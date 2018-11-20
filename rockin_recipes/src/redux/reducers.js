import { LOGIN_USER, LOGIN_USERNAME, ADD_LIKES, ADD_DISLIKES, ADD_RECOMMENDATIONS } from "../actionTypes.js"

export const initialState = {
    user: {
        username: "",
        preferences: {
            likes: [],
            dislikes: []
        }
    },
    recipeList: {
        likes: [],
        dislikes: [],
        recommendations: []
    }
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USERNAME:
            return action.username
            break;
        default:
            return state
    }
}

export const recipeListReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LIKES:
            return { ...state, ...{
                likes: action.likes
            }};
            break;
        case ADD_DISLIKES:
            return { ...state, ...{
                dislikes: action.dislikes
            }};
            break;
        case ADD_RECOMMENDATIONS:
            return { ...state, ...{
                recommendations: action.recommendations
            }};
            break;
        default:
            return state
    }
}
