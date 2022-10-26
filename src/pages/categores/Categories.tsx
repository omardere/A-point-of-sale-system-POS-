import React, { useEffect, useState } from 'react'
import LayoutApp from '../../components/Layout'
import { useDispatch } from "react-redux"
import { addCategories, deleteCategories, getAllCategories, updateCategories } from '../../utils/api';
import { categoriesType } from '../../types/productsType';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const Categories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [searchData, setSearchData] = useState<categoriesType[]>([]);
  const [pop, setPop] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const { Search } = Input;
  //filter categories when searched
  const onSearch = (value: string) => {
    setSearchData(
      categories.filter(product => product.name.toLowerCase().includes(value))
    )
  };
  //fetch all category from back-end
  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
        setSearchData(res.data);
      }).catch(function (error) {
        console.log(error.toJSON());
      });
  }

  const handleDelete = (record: any) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    deleteCategories(record).then(message.success('Categories deleted successfully'));
    setTimeout(() => fetchCategories(), 1000)
    setPop(false);
    dispatch({
      type: "HIDDEN_LOADING",
    });
  }
  //handle form input if add category or update it
  const handleInput = (value: any) => {
    if (editProduct === null) {
      dispatch({
        type: "SHOW_LOADING",
      });
      addCategories(value);
      message.success('Categories added successfully');
      setTimeout(() => fetchCategories(), 1000)
      setPop(false);
      dispatch({
        type: "HIDDEN_LOADING",
      });
    }
    else {
      dispatch({
        type: "SHOW_LOADING",
      });
      updateCategories(value, editProduct.id);
      setTimeout(() => fetchCategories(), 1000)
      message.success('Categories updated successfully');
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
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: any) =>
        <div>
          <DeleteOutlined onClick={() => handleDelete(record)} className='remove-product-from-cart' />
          <EditOutlined onClick={() => { setEditProduct(record); setPop(true) }} className='edit-product' />
        </div>
    },
  ];

  useEffect(() => {
    dispatch({
      type: "SHOW_LOADING",
    });
    fetchCategories();
    dispatch({
      type: "HIDDEN_LOADING",
    });
  }, []);

  return (
    <LayoutApp >
      <h2>All products</h2>
      <div className="buttons">
        <Button onClick={() => setPop(true)} className='add-new'>Add New Category</Button>
        <Search style={{ width: "30%" }} placeholder="input search text" onSearch={onSearch} enterButton />
      </div>
      <Table dataSource={searchData} columns={columns} />;
      {
        pop &&
        <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Category"}`} open={pop} onCancel={() => { setEditProduct(null); setPop(false) }} footer={false}>
          <Form onFinish={handleInput} initialValues={editProduct} layout='vertical'>
            <FormItem name='name' label='Name'>
              <Input />
            </FormItem>

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

export default Categories

