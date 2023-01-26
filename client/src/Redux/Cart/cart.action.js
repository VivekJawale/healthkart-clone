import * as types from './cart.types'
import axios from 'axios'


export const addtocart = (data) => {
    return {
        type: types.ADD_CART_ITEMS,
        payload:data
    }
}

export const checkoutclear = (data) => {
    return {
        type: types.CLEAR_CART_CHECKOUT,
        payload:data
    }
}

export const removefromcart = () => {
    return {
        type: types.REMOVE_ITEM_FROM_CART
    }
}