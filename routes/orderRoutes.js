const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
const sendEmail = require('../utils/emailService');

// Razorpay config
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/orders
router.post('/orders', async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    cardNumber,
    expiry,
    cvv,
    productId,
    variant,
    quantity,
    transactionSim
  } = req.body;

  let transactionStatus = 'approved';
  if (transactionSim === '2') transactionStatus = 'failed';
  else if (transactionSim === '3') transactionStatus = 'error';

  const orderId = uuidv4();
console.log('Order ID:', orderId);
  db.query('SELECT * FROM product WHERE id = ?', [productId], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Invalid product' });

    const product = results[0];
    const price = parseFloat(product.price);
    const total = price * quantity;

    const orderData = {
      id: orderId,
      product_id: productId,
      full_name: fullName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      variant,
      quantity,
      total,
      status: transactionStatus
    };

    db.query('INSERT INTO orders SET ?', orderData, async (err2) => {
      if (err2) return res.status(500).json({ message: 'Failed to save order', error: err2 });

      if (transactionStatus === 'approved') {
        db.query('UPDATE product SET inventory = inventory - ? WHERE id = ?', [quantity, productId]);
      }

      try {
        const razorpayOrder = await razorpay.orders.create({
          amount: Math.round(total * 100),
          currency: 'INR',
          receipt: product.name,
          payment_capture: 1,
        });

        const paymentLink = await razorpay.paymentLink.create({
          amount: Math.round(total * 100),
          currency: 'INR',
          accept_partial: false,
          reference_id: orderId,
          description: `Payment for ${product.name}`,
          customer: {
            name: fullName,
            contact: phone,
            email: email,
          },
          notify: {
            sms: true,
            email: true,
          },
          callback_url: `http://localhost:3000/thank-you/${orderId}`,
          callback_method: 'get',
        });

        // Insert into payment table
        const paymentData = {
          order_id: orderId,
          product_id: productId,
          transaction_id: razorpayOrder.id,
          amount: total,
          currency: 'INR',
          status: transactionStatus,
        };

        db.query('INSERT INTO payment SET ?', paymentData, async (err3) => {
          if (err3) {
            console.error('Failed to save payment data:', err3);
          }

          // Send confirmation/failure email
          await sendEmail({
            to: email,
            subject: transactionStatus === 'approved' ? `Payment Success - Order #${orderId}` : `Payment Failed - Order #${orderId}`,
            html: `
              <h2>Payment ${transactionStatus === 'approved' ? 'Success' : 'Failed'}</h2>
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Product:</strong> ${product.name}</p>
              <p><strong>Quantity:</strong> ${quantity}</p>
              <p><strong>Total:</strong> ₹${total}</p>
              <p><strong>Customer:</strong> ${fullName}, ${address}, ${city}, ${state}, ${zip}, ${phone}</p>
            `
          });

          // Final Response
          res.json({
            orderId,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            product,
            quantity,
            total,
            paymentLink: paymentLink.short_url,
            paymentStatus: transactionStatus
          });
        });
      } catch (error) {
        return res.status(500).json({ message: 'Failed to create Razorpay order or payment link', error });
      }
    });
  });
});

module.exports = router;
