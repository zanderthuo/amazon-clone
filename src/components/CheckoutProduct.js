import React from 'react'

import { useStateValue } from '../StateProvider';

import '../styles/CheckoutProduct.css'

const CkeckoutProduct = ({ id, image, title, price, rating }) => {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    // remove item from cart
    dispatch({
      type: 'REMOVE_FROM_CART',
      id: id,
    })
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__iamge" src={image} alt="#" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>KES</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </div>
    </div>
  )
}

export default CkeckoutProduct
