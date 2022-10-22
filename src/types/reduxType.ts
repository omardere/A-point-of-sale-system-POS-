import { productType } from "./productsType";

export interface IActions {
    UPDATE_CART: string;
    ADD_TO_CART:string;
    DELETE_FROM_CART:string;
  } 
 export interface IDispatch {
    type: IActions;
    payload: productType;
  }