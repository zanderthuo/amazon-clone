import React, {useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {auth} from './firebase'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_6dhWwRSYgGmEC2b4WbYFKMxH00CanKxHVj');

function App() {
  const[{cart}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
