import { LOGIN_USER, LOGIN_USERNAME, ADD_LIKES, ADD_DISLIKES, ADD_RECOMMENDATIONS } from "../actionTypes.js"

export function loginUserAction(user) {
    return {
        type: LOGIN_USER,
        user
    }
}

export function loginUsernameAction(username) {
    return {
        type: LOGIN_USERNAME,
        username
    }
}

export function addLikesAction(likes) {
    return {
        type: ADD_LIKES,
        likes
    }
}

export function addDislikesAction(dislikes) {
    return {
        type: ADD_DISLIKES,
        dislikes
    }
}

export function addRecommendationsAction(recommendations) {
    return {
        type: ADD_RECOMMENDATIONS,
        recommendations
    }
}
