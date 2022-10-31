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
import _ from 'lodash';

const Categories = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<categoriesType[]>([]);
  const [searchData, setSearchData] = useState<categoriesType[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<categoriesType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pop, setPop] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<any>(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const { Search } = Input;
  const pageSize = 10;
  //filter categories when searched
  const onSearch = (value: string) => {

    const data = categories.filter(product => product.name.toLowerCase().includes(value))
    setSearchData(data);
    setPaginatedProducts(_(data).slice(0).take(pageSize).value());
  };
  //fetch all category from back-end
  const fetchCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data);
        setSearchData(res.data);
        setPaginatedProducts(_(res.data).slice(0).take(pageSize).value());
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
    setDeleteDialog(false);
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
      addCategories(value).then(message.success('Categories added successfully'));
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
  //determine number of pages
  const pageCount = searchData ? Math.ceil(searchData.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedProduct = _(searchData).slice(startIndex).take(pageSize).value();
    setPaginatedProducts(paginatedProduct);
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
          <DeleteOutlined onClick={() => { setDeleteDialog(record) }} className='remove-product-from-cart' />
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
      <div>
        {paginatedProducts ?
          (<table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <div>
                        <DeleteOutlined onClick={() => { setDeleteDialog(product) }} className='remove-product-from-cart' />
                        <EditOutlined onClick={() => { setEditProduct(product); setPop(true) }} className='edit-product' />
                      </div>
                    </td>
                  </tr>

                )
                )
              }

            </tbody>
          </table>
          ) : ("No Data Found")}
        <nav className='d-flex '>
          <ul className='pagination'>
            {
              pages.map((pageNumber) => (
                <li className={pageNumber === currentPage ? "page-item active" : "page-item"}>
                  <p className='page-link' onClick={() => pagination(pageNumber)}>{pageNumber}</p>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
      {/* this from antd */}
      {/* <Table dataSource={searchData} columns={columns} />; */}
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
      {
        deleteDialog &&
        <Modal title="Confirm Delete" open={deleteDialog} onOk={() => handleDelete(deleteDialog)} onCancel={() => { setDeleteDialog(false) }}>
          <p>if you confirm to delete this category</p>
        </Modal>
      }

    </LayoutApp>

  )
}

export default Categories

