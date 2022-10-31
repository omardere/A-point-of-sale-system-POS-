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
import _ from 'lodash';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state: typeRootState) => state.rootReducer);
    const [paginatedProducts, setPaginatedProducts] = useState<productType[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const pageSize = 10;

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
    const pageCount = cartItems ? Math.ceil(cartItems.length / pageSize) : 0;
    const pages = _.range(1, pageCount + 1);

    const pagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedProduct = _(cartItems).slice(startIndex).take(pageSize).value();
        setPaginatedProducts(paginatedProduct);
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
        setPaginatedProducts(_(cartItems).slice(0).take(pageSize).value());
    }, [cartItems]
    )

    return (
        <LayoutApp >
            <h2>Cart</h2>
            {/* <Table dataSource={cartItems} columns={columns} />; */}
            <div>
                {paginatedProducts ?
                    (<table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Code</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paginatedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td><img src={`image/${product.image}`} alt={product.name} height={60} width={60} /></td>
                                        <td>{product.category}</td>
                                        <td>{product.code}</td>
                                        <td>{`$${product.price}`}</td>
                                        <td>
                                            <div>
                                                <MinusCircleOutlined onClick={() => decrementHandle(product)} className='quantity-minus' />
                                                <strong className='quantity'>{product.quantity}</strong>
                                                <PlusCircleOutlined onClick={() => incrementHandle(product)} className='quantity-plus' />
                                            </div>
                                        </td>
                                        <td>
                                            <DeleteOutlined onClick={() => deleteHandle(product)} className='remove-product-from-cart' />
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
            <div className="subtotal">
                <p className='accounting'>Sub Total: <span>$ {(subTotal).toFixed(2)}</span></p>
                <p className='accounting'> Discount: <span><input className='discount'
                    type="number"
                    min={0}
                    step={0.1}
                    max={1}
                    value={discount}
                    onChange={handleDiscount} />
                </span>
                </p>
                <p className='accounting'> Apply Tax: <span><input className='discount'
                    type="number"
                    min={0}
                    step={0.1}
                    max={1}
                    value={tax}
                    onChange={handleTax} />
                </span>
                </p>
            </div>
            <div className='accounting total' >
                <p>Total: <span>$ {(subTotal + (subTotal * tax) - (discount * subTotal)).toFixed(2)}</span></p>
            </div>
        </LayoutApp>

    )
}

export default Cart
