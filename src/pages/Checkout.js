import React from 'react'

import Subtotal from '../components/Subtotal'
import CheckoutProduct from '../components/CheckoutProduct'

import { useStateValue } from "../StateProvider";

import '../styles/Checkout.css'

function Checkout() {
  const [{cart}, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h2 className="checkout__title">Your Shopping Cart</h2>
            {cart.map(item => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
        <h2>The subtotal goes here</h2>
      </div>
    </div>
  )
}

export default Checkout
