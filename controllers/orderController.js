// orderController.js
// ...existing code...
const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../utils/emailService');

exports.placeOrder = (req, res) => {
  const data = req.body;
  const orderNumber = uuidv4();
  const status = data.card_number === '1' ? 'approved' : data.card_number === '2' ? 'declined' : 'failed';

  const query = `
    INSERT INTO orders (
      order_number, full_name, email, phone, address,
      city, state, zip_code, card_number, expiry_date, cvv,
      product_id, variant, quantity, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    orderNumber,
    data.full_name,
    data.email,
    data.phone,
    data.address,
    data.city,
    data.state,
    data.zip_code,
    data.card_number,
    data.expiry_date,
    data.cvv,
    data.product_id,
    data.variant,
    data.quantity,
    status
  ];

  db.query(query, values, (err) => {
    if (err) return res.status(500).send('Database error.');

    // Simulate inventory update
    db.query('UPDATE products SET inventory = inventory - ? WHERE id = ?', [data.quantity, data.product_id]);

    // Send Email
    const emailHTML = `
      <h2>Order ${status === 'approved' ? 'Confirmed' : 'Failed'}</h2>
      <p>Order Number: ${orderNumber}</p>
      <p>Product: ${data.product_name}</p>
      <p>Customer: ${data.full_name}</p>
      ${status !== 'approved' ? '<p>Please try again or contact support.</p>' : ''}
    `;
    sendEmail(data.email, `Your order is ${status}`, emailHTML);

    res.json({ orderNumber, status });
  });
};

exports.getOrder = (req, res) => {
  const { orderNumber } = req.params;
  db.query('SELECT * FROM orders WHERE order_number = ?', [orderNumber], (err, result) => {
    if (err || result.length === 0) return res.status(404).send('Order not found.');
    res.json(result[0]);
  });
};
