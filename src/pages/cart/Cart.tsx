import React, { useEffect, useState } from 'react'
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
    const [subTotal, setSubTotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);

    const incrementHandle = (record: any) => {
        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity + 1 }
        });
    }
    const decrementHandle = (record: any) => {
        if (record.quantity !== 1) {
            dispatch({
                type: "UPDATE_CART",
                payload: { ...record, quantity: record.quantity - 1 }
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
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'id',
            key: 'quantity',
            render: (id: string, record: productType) =>
                <div>
                    <MinusCircleOutlined onClick={() => decrementHandle(record)} className='quantity-minus' />
                    <strong className='quantity'>{record.quantity}</strong>
                    <PlusCircleOutlined onClick={() => incrementHandle(record)} className='quantity-plus' />
                </div>
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id: string, record: any) => <DeleteOutlined onClick={() => deleteHandle(record)} className='remove-product-from-cart' />
        },
    ];
    const handleDiscount = (e: React.FormEvent<HTMLInputElement>): void => {
        setDiscount(+e.currentTarget.value);
    };
    const handleTax = (e: React.FormEvent<HTMLInputElement>): void => {
        setTax(+e.currentTarget.value);
    };
    useEffect(() => {
        let temp = 0;
        cartItems.forEach((product) => {
            temp += product.price * product.quantity
        });
        setSubTotal(temp);
    }, [cartItems]
    )

    return (
        <LayoutApp >
            <h2>Cart</h2>
            <Table dataSource={cartItems} columns={columns} />;
            <div className="subtotal">
                <h2>Sub Total: <span>$ {(subTotal).toFixed(2)}</span></h2>
                <h2> Discount: <span><input className='discount'
                    type="number"
                    min={0}
                    step={0.1}
                    max={1}
                    value={discount}
                    onChange={handleDiscount} />
                </span>
                </h2>
                <h2> Apply Tax: <span><input className='discount'
                    type="number"
                    min={0}
                    step={0.1}
                    max={1}
                    value={tax}
                    onChange={handleTax} />
                </span>
                </h2>
            </div>
            <div className="total">
                <h2>Total: <span>$ {(subTotal + (subTotal * tax) - (discount * subTotal)).toFixed(2)}</span></h2>

            </div>
        </LayoutApp>

    )
}

export default Cart
