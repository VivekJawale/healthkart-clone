import * as types from "./cart.types";

const initialstate=[];

export const reducer = (state = initialstate, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADD_CART_ITEMS: {
            return payload  
        }
        case types.CLEAR_CART_CHECKOUT: {
            return []
        }
        case types.REMOVE_ITEM_FROM_CART: {
            return payload
        }
        default: return state
    }
}
