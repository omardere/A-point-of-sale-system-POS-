import { ReactNode } from "react";

export type productType = {
  id:string,
  name: string,
  code: string,
  category:string,
  image: string,  
  quantity:number      
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
 