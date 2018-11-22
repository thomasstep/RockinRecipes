import { LOGIN_USERNAME, ADD_LIKES, ADD_DISLIKES, ADD_RECOMMENDATIONS } from "../actionTypes.js"

export const initialState = {
    user: "",
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
        case ADD_DISLIKES:
            return { ...state, ...{
                dislikes: action.dislikes
            }};
        case ADD_RECOMMENDATIONS:
            return { ...state, ...{
                recommendations: action.recommendations
            }};
        default:
            return state
    }
}
