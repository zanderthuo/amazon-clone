import React,{ useState, useEffect } from 'react'

import CheckoutProduct from '../components/CheckoutProduct'

import { Link, useHistory } from 'react-router-dom'

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import CurrencyFormat from 'react-currency-format'
import axios from '../axios'
import { getCartTotal } from '../reducer'

import { useStateValue } from '../StateProvider'

import '../styles/Payment.css'

const Payment = () => {
  const history = useHistory();

  const [{cart, user}, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies submits
        url: `/payments/create?total=${getCartTotal(cart) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [cart])

  console.log('the secret is >>>', clientSecret)

  const handleSubmit = async (e) => {
    // do fancy stripe functions
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      // paymentIntent = payment confirmation

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      history.replace('/orders')
    })
  }

  const handleChange = e => {
    // listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout {
            <Link to="/checkout">{cart?.length} items</Link>
          }
        </h1>

      {/* Payment section - Delivery address */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment__address">
          <p>{user?.email}</p>
          <p>123 Buchuma Road</p>
          <p>Nairobi, Kenya</p>
        </div>
      </div>

      {/* Payment section - Review Items */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Review items and Delivery</h3>
        </div>
        <div className="payment__items">
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

      {/* Payment section - Payment method*/}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          {/*Add Mpesa as a payment option*/}

          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange}/>

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <h3>Order Total: {value}</h3>
                  </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"KES. "}
              />
            <button disabled={processing || disabled || succeeded}>
              <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
            </button>
            </div>

            {/*error*/}
            {error && <div>{error}</div>}
          </form>
        </div>
      -</div>
      </div>
    </div>
  )
}

export default Payment
