// seed.js
const { v4: uuid } = require('uuid');
const { db, init } = require('./db');

init();

const products = [
  { id: uuid(), name: 'Vibe T-Shirt', price: 499, description: 'Comfortable cotton tee' },
  { id: uuid(), name: 'Vibe Hoodie', price: 1499, description: 'Cozy hoodie' },
  { id: uuid(), name: 'Vibe Mug', price: 249, description: 'Ceramic mug' },
  { id: uuid(), name: 'Vibe Cap', price: 299, description: 'Adjustable cap' },
  { id: uuid(), name: 'Vibe Tote Bag', price: 399, description: 'Reusable tote' }
];

const insert = db.prepare('INSERT OR REPLACE INTO products (id, name, price, description) VALUES (?, ?, ?, ?)');
const insertMany = db.transaction((items) => {
  for (const p of items) insert.run(p.id, p.name, p.price, p.description);
});

insertMany(products);
console.log('Seeded products:', products.length);
