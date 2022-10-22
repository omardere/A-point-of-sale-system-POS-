import React from 'react'
import { products } from '../types/productsType'
import { Button, Card } from 'antd';
import { useDispatch } from "react-redux";

const Product: React.FunctionComponent<products> = ({ prod }) => {
    const { Meta } = Card;
    const dispatch = useDispatch();
    const handleCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...prod, quantity: 1 }
        })
    }
    let imageSrc = `image/${prod.image}`
    return (
        <Card
            hoverable
            style={{ width: 240, marginBottom: 30 }}
            cover={<img alt={prod.name} style={{ height: 200 }} src={imageSrc} />}
        >
            <Meta title={prod.name} description={prod.category} />
            <div className="product-buttons">
                <Button onClick={() => handleCart()}>
                    Add to Cart
                </Button>
            </div>

        </Card>
    )
}

export default Product
