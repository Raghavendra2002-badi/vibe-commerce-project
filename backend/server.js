// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Sample data
let products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Jeans", price: 999 },
  { id: 3, name: "Sneakers", price: 1999 },
];

let cart = [];

// ✅ Get all products
app.get("/api/products", (req, res) => {
  res.json({ ok: true, products });
});

// ✅ Get cart
app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ ok: true, cart, total });
});

// ✅ Add to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.json({ ok: false, error: "Product not found" });

  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ ...product, qty });

  res.json({ ok: true, cart });
});

// ✅ Update quantity
app.put("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { qty } = req.body;
  const item = cart.find((c) => c.id === id);
  if (!item) return res.json({ ok: false, error: "Item not found" });
  item.qty = qty;
  res.json({ ok: true, cart });
});

// ✅ Remove from cart
app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((c) => c.id !== id);
  res.json({ ok: true, cart });
});

// ✅ Checkout (mock)
app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = {
    id: Date.now(),
    total,
    timestamp: new Date(),
  };
  cart = []; // empty cart
  res.json({ ok: true, receipt });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
