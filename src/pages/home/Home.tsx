import React, { useState } from 'react'
import { useEffect } from 'react';
import LayoutApp from '../../components/Layout'
import { getAllCategories, getAllProducts } from '../../utils/api';
import { Col, Form, Input, Row } from 'antd';
import Product from '../../components/Product';
import { categoriesType, productType } from '../../types/productsType';
import { useDispatch } from "react-redux"
import FormItem from 'antd/lib/form/FormItem';



const Home = () => {

    const [products, setProducts] = useState<productType[]>([]);
    const [searchData, setSearchData] = useState<productType[]>([]);
    const [categories, setCategories] = useState<categoriesType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("jeans");
    const dispatch = useDispatch();
    const { Search } = Input;

    const onSearch = (value: string) => {
        setSearchData(
            products.filter(product => product.name.toLowerCase().includes(value))
        )
    };
    const fetchProducts = () => {
        getAllProducts()
            .then((res) => {
                setProducts(res.data);
                setSearchData(res.data);
            }).catch(function (error) {
                console.log(error.toJSON());
            });
    }
    const fetchCategories = () => {
        getAllCategories()
            .then((res) => {
                setCategories(res.data);
                setSelectedCategory(res.data[0].name);
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
        fetchCategories();

    }, [dispatch]);
    return (
        <div>
            <LayoutApp >
                <div className="category">
                    {categories.map(category => {
                        return (
                            <div key={category.id} className={`category-box ${selectedCategory === category.name &&
                                'category-selected'}`} onClick={() => {setSelectedCategory(category.name);setSearchData(products)}}>
                                <h3 className="category-name">
                                    {category.name}
                                </h3>
                            </div>
                        )
                    })}
                </div>
                <div className="search">
                    <Search  placeholder="input search text"  onSearch={onSearch} enterButton />
                </div>

                <Row>
                    {
                        searchData.filter((item) => item.category === selectedCategory).map((product) => {
                            return (
                                <Col key={product.id} xs={24} sm={6} md={12} lg={6} >
                                    <Product key={product.id} prod={product} />
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
