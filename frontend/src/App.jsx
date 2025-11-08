import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCart,
  addToCart,
  removeCart,
  updateCartQty,
  checkout,
} from "./api";
import ProductsGrid from "./components/ProductsGrid";
import CartView from "./components/CartView";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch products safely
  async function loadProducts() {
    try {
      const r = await fetchProducts();
      if (r && r.ok) setProducts(r.products || []);
      else throw new Error("Failed to load products");
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Could not load products.");
    }
  }

  // ✅ Fetch cart safely
  async function loadCart() {
    try {
      const r = await fetchCart();
      if (r && r.ok) {
        setCart(r.cart || []);
        setTotal(r.total || 0);
      } else throw new Error("Failed to load cart");
    } catch (err) {
      console.error("Error loading cart:", err);
      setError("Could not load cart.");
    }
  }

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  // ✅ Add to cart
  async function handleAdd(productId) {
    try {
      setLoading(true);
      await addToCart(productId, 1);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to add item to cart.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Remove from cart
  async function handleRemove(cartId) {
    try {
      await removeCart(cartId);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to remove item.");
    }
  }

  // ✅ Update quantity
  async function handleQtyChange(cartId, qty) {
    try {
      await updateCartQty(cartId, qty);
      await loadCart();
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity.");
    }
  }

  // ✅ Checkout
  async function handleCheckout(customer) {
    try {
      const payload = {
        name: customer.name,
        email: customer.email,
        cartItems: cart,
      };
      const r = await checkout(payload);
      if (r && r.ok) {
        setReceipt(r.receipt);
        setShowCheckout(false);
        await loadCart();
      } else {
        alert("Checkout failed: " + (r.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }
  }

  return (
    <div className="container">
      <header>
        <h1>🛍️ Vibe Commerce — Mock Cart</h1>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <main>
        <ProductsGrid
          products={products}
          onAdd={handleAdd}
          disabled={loading}
        />

        <CartView
          items={cart}
          total={total}
          onRemove={handleRemove}
          onQtyChange={handleQtyChange}
          onCheckout={() => setShowCheckout(true)}
        />
      </main>

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {receipt && (
        <section className="receipt">
          <h3>Receipt</h3>
          <div>Receipt ID: {receipt.id}</div>
          <div>Total: ₹{receipt.total}</div>
          <div>Time: {new Date(receipt.timestamp).toLocaleString()}</div>
        </section>
      )}
    </div>
  );
}
