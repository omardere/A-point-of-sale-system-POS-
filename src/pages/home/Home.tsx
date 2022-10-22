import React, { useState } from 'react'
import { useEffect } from 'react';
import LayoutApp from '../../components/Layout'
import { getAllProducts } from '../../utils/api';
import { Col, Row } from 'antd';
import Product from '../../components/Product';
import { productType } from '../../types/productsType';
import { useDispatch } from "react-redux"



const Home = () => {

    const [products, setProducts] = useState<productType[]>([]);
    const dispatch = useDispatch();

    const fetchProducts = () => {
        getAllProducts()
            .then((res) => {
                setProducts(res.data);
            }).catch(function (error) {
                console.log(error.toJSON());
            });
    }

    useEffect(() => {
        dispatch({
            type: "SHOW_LOADING",
        });
        setTimeout(() => {
            fetchProducts();
            dispatch({
                type: "HIDDEN_LOADING",
            });
        }, 1000);


    }, [dispatch]);
    return (
        <div>
            <LayoutApp >
                <Row>
                    {
                        products.map((product) => {
                            return (
                                <Col key={product.id} xs={24} sm={6} md={12} lg={6} >
                                    <Product prod={product} />
                                </Col>
                            );
                        })
                    }
                </Row>
            </LayoutApp>

        </div>
    )
}

export default Home
