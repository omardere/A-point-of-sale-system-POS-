import React, { useEffect, useState } from 'react'
import LayoutApp from '../../components/Layout'
import { useDispatch } from "react-redux"
import { getAllCategories, getAllProducts } from '../../utils/api';
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
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [pop, setPop] = useState<boolean>(false);
  const [imageName, setImageName] = useState<string>("");

  const fetchProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }
  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }

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

  const addProducts = (value: any) => {
    axios.post(`http://localhost:8000/products`, {
      name: value.name,
      category: value.category,
      image: imageName,
      code: value.code
    })
  }
  const handleInput = (value: any) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    addProducts(value);
    message.success('product added successfully');
    fetchProducts();
    setPop(false);
    dispatch({
      type: "HIDDEN_LOADING",
    });
  }


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
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: any) =>
        <div>
          <DeleteOutlined className='remove-product-from-cart' />
          <EditOutlined className='edit-product' />
        </div>

    },
  ];

  return (
    <LayoutApp >
      <h2>All products</h2>
      <Button onClick={() => setPop(true)} className='add-new'>Add New Product</Button>
      <Table dataSource={products} columns={columns} />;
      <Modal title="Add New Product" open={pop} onCancel={() => setPop(false)} footer={false}>
        <Form onFinish={handleInput} layout='vertical'>
          <FormItem name='name' label='Name'>
            <Input />
          </FormItem>
          <FormItem name='code' label='Code'>
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
            <Upload beforeUpload={(file: any) => { setImageName(file.name); console.log(file.name) }} action="http://localhost:3000/products" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <div className="add-btn-to-form">
            <Button htmlType='submit' className='add-btn'>
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </LayoutApp>

  )
}

export default Products
