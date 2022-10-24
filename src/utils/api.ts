import axios from "axios";
export const getAllProducts = () => {
    return axios.get(`http://localhost:8000/products`)
}
export const getAllCategories = () => {
    return axios.get(`http://localhost:8000/categories`)
}
export const deleteProducts = (record: any) => {
    return  axios.delete(`http://localhost:8000/products/${record.id}`)
  }
  export const deleteCategories = (record: any) => {
    return  axios.delete(`http://localhost:8000/categories/${record.id}`)
  }
  
