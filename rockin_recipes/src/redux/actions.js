import { LOGIN_USER, LOGIN_USERNAME } from "../actionTypes.js"

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
