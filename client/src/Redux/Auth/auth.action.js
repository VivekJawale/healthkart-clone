import axios from 'axios'
import * as types from './auth.actionTypes'

export const postLoginRequest = () => {
    return {
        type: types.USER_LOGIN_REQUEST
    }
}

export const postLoginSuccess = (data) => {
    return {
        type: types.USER_LOGIN_SUCCESS,
        payload:data
    }
}

export const postLoginFailure = () => {
    return {
        type: types.USER_LOGIN_FAILURE
    }
}
export const userLogout=()=>{
    return{
        type:types.USER_LOGOUT
    }
}