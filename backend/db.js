// db.js
const Database = require('better-sqlite3');
const db = new Database('./data.db');

function init() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price INTEGER,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY,
      productId TEXT,
      qty INTEGER,
      addedAt INTEGER
    );

    CREATE TABLE IF NOT EXISTS receipts (
      id TEXT PRIMARY KEY,
      total INTEGER,
      createdAt INTEGER,
      payload TEXT
    );
  `);
}

function getProducts() {
  return db.prepare('SELECT * FROM products').all();
}

function getProductById(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
}

function addCartItem(id, productId, qty) {
  return db.prepare('INSERT INTO cart (id, productId, qty, addedAt) VALUES (?, ?, ?, ?)').run(id, productId, qty, Date.now());
}

function removeCartItem(id) {
  return db.prepare('DELETE FROM cart WHERE id = ?').run(id);
}

function updateCartQty(id, qty) {
  return db.prepare('UPDATE cart SET qty = ? WHERE id = ?').run(qty, id);
}

function getCartItems() {
  return db.prepare(`
    SELECT c.id as cartId, p.id as productId, p.name, p.price, c.qty
    FROM cart c
    JOIN products p ON p.id = c.productId
  `).all();
}

function clearCart() {
  return db.prepare('DELETE FROM cart').run();
}

function addReceipt(id, total, payload) {
  return db.prepare('INSERT INTO receipts (id, total, createdAt, payload) VALUES (?, ?, ?, ?)').run(id, total, Date.now(), JSON.stringify(payload));
}

module.exports = {
  db,
  init,
  getProducts,
  getProductById,
  addCartItem,
  removeCartItem,
  updateCartQty,
  getCartItems,
  clearCart,
  addReceipt
};
