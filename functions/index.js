const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors')
const stripe = require('stripe')(
  'sk_test_A3ClyOGelWRHQfThdlKolHWv00VUL0iHiX'
);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/',(req, res) => res.status(200).send('hello word'))

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;

  console.log('Payment Request Recieved >>>', total)

  const paymentIntent = await stripe.paymentIntent.create({
    amount: total, // subunits of the currency
    currency: 'kes',
  });

  res.status(201).send({
    clientSecret: paymentIntent.clientSecret,
  });
})

// Listen command
exports.api = functions.https.onRequest(app)
