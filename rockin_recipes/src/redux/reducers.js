import { LOGIN_USER, LOGIN_USERNAME } from "../actionTypes.js"

export const initialState = {
    user: {},
    username: "",
    userLikes: [],
    userDislikes: [],
    recommendations: []
}

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, ...{
                preferences: action.user
            }};
            break;
        case LOGIN_USERNAME:
            return { ...state, ...{
                username: action.username
            }};
            break;
        default:
            return state
    }
}
