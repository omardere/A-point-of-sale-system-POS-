import React from 'react'
import LayoutApp from '../../components/Layout'
import { useSelector, useDispatch } from "react-redux"
import { productType, typeRootState } from '../../types/productsType';
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';
import { Table } from 'antd';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state: typeRootState) => state.rootReducer);
    const incrementHandle = (record: any) => {
        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity + 1 }
        });
    }
    const decrementHandle=(record:any)=>{
        if(record.quantity!==1)
        {
            dispatch({
                type: "UPDATE_CART",
                payload: {...record,quantity:record.quantity-1}
            });
        } 
    }
    const deleteHandle = (record: any) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
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
            title: 'Quantity',
            dataIndex: 'id',
            key: 'quantity',
            render: (id: string, record: productType) =>
                <div>
                    <MinusCircleOutlined onClick={()=>decrementHandle(record)} className='quantity-minus' />                    
                    <strong className='quantity'>{record.quantity}</strong>
                    <PlusCircleOutlined onClick={() => incrementHandle(record)} className='quantity-plus' />
                </div>
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id: string, record: any) => <DeleteOutlined onClick={()=>deleteHandle(record)} className='remove-product-from-cart' />
        },
    ];
    return (
        <LayoutApp >
            <h2>Cart</h2>
            <Table dataSource={cartItems} columns={columns} />;
        </LayoutApp>

    )
}

export default Cart
