const db = require('../models/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM product', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, description, price, image, inventory, variant } = req.body;
  db.query(
    'INSERT INTO product (name, description, price, image, inventory, variant) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, image, inventory, variant],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
    }
  );
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, inventory, variant } = req.body;
  db.query(
    'UPDATE product SET name = ?, description = ?, price = ?, image = ?, inventory = ?, variant = ? WHERE id = ?',
    [name, description, price, image, inventory, variant, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product updated successfully' });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM product WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  });
};
