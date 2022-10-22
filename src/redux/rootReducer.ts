import { AnyAction } from 'redux'
import { productType } from '../types/productsType';

const initialState = {
    loading: false,
    cartItems: []
}
export const rootReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case "SHOW_LOADING":
            return{
                ...state,
                loading:true
            };
        case "HIDDEN_LOADING":
            return{
                ...state,
                loading:false
                }
        case "ADD_TO_CART":
            return{
                ...state,
                cartItems:[...state.cartItems,action.payload]
            };
        case "UPDATE_CART":
                return{
                    ...state,
                    cartItems:state.cartItems.map((product:productType)=>product.id === action.payload.id ? {...product,quantity:
                    action.payload.quantity}:product),
                };
        case "DELETE_FROM_CART":
                    return{
                        ...state,
                        cartItems:state.cartItems.filter((product:productType)=>product.id !== action.payload.id),
                    };
        default: return state;
    }
}