import axios from "axios";
export const getAllProducts = () => {
    return axios.get(`http://localhost:8000/products`)
}
export const getAllCategories = () => {
    return axios.get(`http://localhost:8000/categories`)
}
