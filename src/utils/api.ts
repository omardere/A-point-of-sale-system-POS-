import axios from "axios";
export const getAllProducts = () => {
  return axios.get(`http://localhost:8000/products`)
}
export const getAllCategories = () => {
  return axios.get(`http://localhost:8000/categories`)
}
export const deleteProducts = (record: any) => {
  return axios.delete(`http://localhost:8000/products/${record.id}`)
}
export const deleteCategories = (record: any) => {
  return axios.delete(`http://localhost:8000/categories/${record.id}`)
}
export const addCategories = (value: any) => {
  return axios.post(`http://localhost:8000/categories`, {
    name: value.name,
  }).then()
}
export const updateCategories = (value: any,id:string) => {
  return axios.put(`http://localhost:8000/categories/${id}`, {
    name: value.name,
  })
}
export const addProducts = (value: any,imageName:string) => {
  return axios.post(`http://localhost:8000/products`, {
    name: value.name,
    category: value.category,
    image: imageName,
    code: value.code,
    price: value.price
  })
}
export const updateProducts = (value: any,imageName:string,id:string) => {
  return axios.put(`http://localhost:8000/products/${id}`, {
    name: value.name,
    category: value.category,
    image: imageName,
    code: value.code,
    price: value.price
  })
}

