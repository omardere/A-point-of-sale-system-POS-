import { ReactNode } from "react";

export type productType = {
  id:string,
  name: string,
  code: string,
  category:string,
  image: string,  
  quantity:number,
  price:number      
}
export type categoriesType={
  name:string,
  id:string
}
export interface products {
  prod:{
    id:string
    name: string;
    code:string;
    category:string;
    image:string;
    price:number ;   

  }
}
export type reactElementProps = {
  children: JSX.Element|ReactNode,
};
export type typeRootState ={
  rootReducer:{
    cartItems:productType[]|[],
    loading:boolean
  }
}
 