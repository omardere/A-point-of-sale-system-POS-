import React, { useEffect, useState } from 'react'
import LayoutApp from '../../components/Layout'
import { useDispatch } from "react-redux"
import { addProducts, deleteProducts, getAllCategories, getAllProducts, updateProducts } from '../../utils/api';
import { productType, categoriesType } from '../../types/productsType';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select, Table, Upload } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<productType[]>([]);
  const [searchData, setSearchData] = useState<productType[]>([]);
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [pop, setPop] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");
  const [editProduct, setEditProduct] = useState<any>(null);
  const { Search } = Input;
  //filter products when searched
  const onSearch = (value: string) => {
    setSearchData(
      products.filter(product => product.name.toLowerCase().includes(value))
    )
  };
  //fetch all products from back-end
  const fetchProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setSearchData(res.data);
      }).catch(function (error) {
        message.warning("the updated problem");
        console.log(error.toJSON());
      });
  }
  //fetch all category from back-end
  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }

  const handleDelete = (record: any) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    deleteProducts(record).then(message.success('product deleted successfully'));
    setTimeout(() => fetchProducts(), 1000)
    setPop(false);
    dispatch({
      type: "HIDDEN_LOADING",
    });
  }
  //handle form input if add product or update it
  const handleInput = (value: any) => {
    if (editProduct === null) {
      dispatch({
        type: "SHOW_LOADING",
      });
      addProducts(value, imageName);
      message.success('product added successfully');
      setTimeout(() => fetchProducts(), 1000)
      setPop(false);
      dispatch({
        type: "HIDDEN_LOADING",
      });
    }
    else {
      dispatch({
        type: "SHOW_LOADING",
      });
      updateProducts(value, imageName, editProduct.id);
      setTimeout(() => fetchProducts(), 1000)
      message.success('product updated successfully');
      setPop(false);
      dispatch({
        type: "HIDDEN_LOADING",
      });
    }
  }
  //set columns of table
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string, record: any) => <img src={`image/${image}`} alt={record.name} height={60} width={60} />
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: any) =>
        <div>
          <DeleteOutlined onClick={() => handleDelete(record)} className='remove-product-from-cart' />
          <EditOutlined onClick={() => { setEditProduct(record); setImageName(record.image); setPop(true) }} className='edit-product' />
        </div>

    },
  ];

  useEffect(() => {
    dispatch({
      type: "SHOW_LOADING",
    });
    fetchProducts();
    fetchCategories();
    dispatch({
      type: "HIDDEN_LOADING",
    });
  }, []);

  return (
    <LayoutApp >
      <h2>All products</h2>
      <div className="buttons">
        <Button onClick={() => setPop(true)} className='add-new'>Add New Product</Button>
        <Search style={{ width: "30%" }} placeholder="input search text" onSearch={onSearch} enterButton />
      </div>

      <Table dataSource={searchData} columns={columns} />;
      {
        pop &&
        <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`} open={pop} onCancel={() => { setEditProduct(null); setPop(false) }} footer={false}>
          <Form onFinish={handleInput} initialValues={editProduct} layout='vertical'>
            <FormItem name='name' label='Name'>
              <Input />
            </FormItem>
            <FormItem name='code' label='Code'>
              <Input />
            </FormItem>
            <FormItem name='price' label='Price'>
              <Input />
            </FormItem>
            <Form.Item name='category' label='Category'>
              <Select >
                {categories.map(item => {
                  return (
                    <Select.Option key={item.id} value={item.name}>{item.name} </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Upload Image" valuePropName="fileList">

              <Upload beforeUpload={(file: any) => { setImageName(file.name) }} action="http://localhost:3000/products" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <div className="add-btn-to-form">
              <Button htmlType='submit' className='add-btn'>
                {editProduct !== null ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal>
      }
    </LayoutApp>

  )
}

export default Products
