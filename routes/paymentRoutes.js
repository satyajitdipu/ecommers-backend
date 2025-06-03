// paymentRoutes.js or in your Express app
const express = require('express');
const router = express.Router();
const db = require('../models/db'); // fixed path to db.js

router.post('/payment/save-payment', async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order_id,
    status
  } = req.body;

  try {
    // Check for existing payment with the same razorpay_payment_id only
    const [existing] = await db.promise().query(
      'SELECT * FROM payment WHERE razorpay_payment_id = ?',
      [razorpay_payment_id]
    );
    if (existing && existing.length > 0) {
      return res.status(409).json({ message: 'Payment already exists for this Razorpay payment.' });
    }

    await db.promise().query(
      'INSERT INTO payment (order_id, razorpay_payment_id, razorpay_order_id, razorpay_signature, status) VALUES (?, ?, ?, ?, ?)',
      [order_id, razorpay_payment_id, razorpay_order_id, razorpay_signature, status]
    );

    res.status(200).json({ message: 'Payment saved' });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Failed to save payment', details: err.message });
  }
});

router.get('/payment/order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const [results] = await db.promise().query(
      'SELECT o.*, p.name, p.price, p.variant FROM orders o JOIN product p ON o.product_id = p.id WHERE o.id = ?',
      [orderId]
    );
    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});

module.exports = router;

