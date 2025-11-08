// index.js
const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

db.init();

// GET /api/products
app.get('/api/products', (req, res) => {
  try {
    const products = db.getProducts();
    res.json({ ok: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to fetch products' });
  }
});

// GET /api/cart
app.get('/api/cart', (req, res) => {
  try {
    const items = db.getCartItems();
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ ok: true, cart: items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to fetch cart' });
  }
});

// POST /api/cart { productId, qty }
app.post('/api/cart', (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    const product = db.getProductById(productId);
    if (!product) return res.status(400).json({ ok: false, error: 'Invalid productId' });

    const id = uuid();
    db.addCartItem(id, productId, qty);
    res.status(201).json({ ok: true, message: 'Added to cart', cartItemId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to add item to cart' });
  }
});

// DELETE /api/cart/:id
app.delete('/api/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.removeCartItem(id);
    res.json({ ok: true, message: 'Removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to remove item' });
  }
});

// PATCH /api/cart/:id update qty (bonus)
app.patch('/api/cart/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    if (!Number.isInteger(qty) || qty < 1) return res.status(400).json({ ok: false, error: 'Invalid qty' });
    db.updateCartQty(id, qty);
    res.json({ ok: true, message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Failed to update qty' });
  }
});

// POST /api/checkout { name, email, cartItems }
app.post('/api/checkout', (req, res) => {
  try {
    const { name, email, cartItems } = req.body;
    if (!name || !email) return res.status(400).json({ ok: false, error: 'Missing name/email' });

    // compute total server-side
    const items = db.getCartItems();
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);

    const receipt = {
      id: uuid(),
      total,
      timestamp: Date.now(),
      customer: { name, email },
      items
    };

    db.addReceipt(receipt.id, total, receipt);
    db.clearCart();

    res.json({ ok: true, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Checkout failed' });
  }
});

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
