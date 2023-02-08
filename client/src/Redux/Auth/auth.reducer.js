import * as types from './auth.actionTypes'

const initialState = {
    isAuth: false,
    token: '',
    isAuthLoading: false,
    isAuthError: false,
    name:"",
    msg:""
}


export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(payload)

    switch (type) {
        case types.USER_LOGIN_REQUEST: {
            return {
                ...state, isAuthLoading: true
            }
        }
        case types.USER_LOGIN_SUCCESS: {
            return {
                ...state, isAuthLoading: false, isAuth: true, token: payload.token,name:payload.name,msg:payload.message
            }
        }
        case types.USER_LOGIN_FAILURE: {
            return {
                ...state, isAuthLoading: false, isAuthError: true
            }
        }
        case types.USER_LOGOUT:{
            return {
                    isAuth: false,
                    token: "",
                    name:"",
                    msg:"",
                    isAuthLoading: false,
                    isAuthError: false         
            }
        }
        default: return state
    }
}