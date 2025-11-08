import React, { useEffect, useState } from "react";
import { fetchCart, removeCart, updateCartQty } from "../api";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  async function loadCart() {
    const res = await fetchCart();
    if (res.ok) {
      setCart(res.cart || []);
      setTotal(res.total || 0);
    }
  }

  async function handleRemove(id) {
    await removeCart(id);
    loadCart();
  }

  async function handleQtyChange(id, qty) {
    await updateCartQty(id, qty);
    loadCart();
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="cart-container" style={{ padding: "1rem" }}>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #ccc",
                padding: "0.5rem 0",
              }}
            >
              <span>{item.name}</span>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) => handleQtyChange(item.id, +e.target.value)}
              />
              <span>₹{item.price * item.qty}</span>
              <button onClick={() => handleRemove(item.id)}>❌</button>
            </div>
          ))}
          <h3 style={{ marginTop: "1rem" }}>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}
