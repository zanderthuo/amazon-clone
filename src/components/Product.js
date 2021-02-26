import React from 'react'
import { useStateValue } from "../StateProvider";

import '../styles/Product.css'

function Product({id, title, image, price, rating }) {
  const [{cart}, dispatch] = useStateValue();

  console.log('this is the cart')

  const addToCart = () => {
    // dispatch the item to the data layer
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>KES. </small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  )
}

export default Product
