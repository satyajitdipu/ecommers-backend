// adminRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const path = require('path');

// Middleware to serve static files from the admin folder
router.use('/static', express.static(path.join(__dirname, '../public/admin')));

// Admin authentication middleware
const requireAuth = (req, res, next) => {
  // This is a simple implementation. In production, use proper authentication with sessions/JWT
  const { username, password } = req.query;
  if (username === 'admin' && password === 'admin123') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Serve admin dashboard
router.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/dashboard.html'));
});

// API routes for admin

// Authentication endpoint
router.get('/auth', requireAuth, (req, res) => {
  res.json({ success: true, message: 'Authentication successful' });
});

// Get all products
router.get('/products', requireAuth, async (req, res) => {
  try {
    const [products] = await db.promise().query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Get a single product
router.get('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(products[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

// Create a new product
router.post('/products', requireAuth, async (req, res) => {
  const { name, description, price, image, inventory, variant } = req.body;
  try {
    const [result] = await db.promise().query(
      'INSERT INTO products (name, description, price, image, inventory, variant) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, image, inventory, variant]
    );
    res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// Update a product
router.put('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, inventory, variant } = req.body;
  try {
    await db.promise().query(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ?, inventory = ?, variant = ? WHERE id = ?',
      [name, description, price, image, inventory, variant, id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// Delete a product
router.delete('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

// Get all orders
router.get('/orders', requireAuth, async (req, res) => {
  try {
    const [orders] = await db.promise().query(`
      SELECT o.*, p.name as product_name 
      FROM orders o 
      JOIN product p ON o.product_id = p.id
      ORDER BY o.id DESC
    `);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
});

// Get a single order
router.get('/orders/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const [orders] = await db.promise().query(`
      SELECT o.*, p.name as product_name, p.price, p.image
      FROM orders o 
      JOIN product p ON o.product_id = p.id
      WHERE o.id = ?
    `, [id]);
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get payment information
    const [payments] = await db.promise().query(
      'SELECT * FROM payment WHERE order_id = ?',
      [id]
    );
    
    const order = orders[0];
    order.payment = payments.length > 0 ? payments[0] : null;
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order', details: err.message });
  }
});

// Update order status
router.patch('/orders/:id/status', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  try {
    await db.promise().query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status', details: err.message });
  }
});

// Get summary statistics
router.get('/stats', requireAuth, async (req, res) => {
  try {
    // Get product count
    const [productCount] = await db.promise().query('SELECT COUNT(*) as count FROM products');
    
    // Get order count
    const [orderCount] = await db.promise().query('SELECT COUNT(*) as count FROM orders');
    
    // Get recent orders
    const [recentOrders] = await db.promise().query(`
      SELECT o.id, o.full_name, o.total, o.status, p.name as product_name
      FROM orders o
      JOIN products p ON o.product_id = p.id
      ORDER BY o.id DESC
      LIMIT 5
    `);
    
    // Get top selling products
    const [topProducts] = await db.promise().query(`
      SELECT p.id, p.name, SUM(o.quantity) as total_sold
      FROM products p
      JOIN orders o ON p.id = o.product_id
      WHERE o.status = 'approved'
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    
    // Calculate total revenue
    const [revenue] = await db.promise().query(`
      SELECT SUM(total) as total_revenue
      FROM orders
      WHERE status = 'approved'
    `);
    
    res.json({
      productCount: productCount[0].count,
      orderCount: orderCount[0].count,
      recentOrders,
      topProducts,
      totalRevenue: revenue[0].total_revenue || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics', details: err.message });
  }
});

module.exports = router;
