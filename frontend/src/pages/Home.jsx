import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    try {
      const res = await fetchProducts();
      if (res.ok) setProducts(res.products || []);
      else throw new Error("Failed to fetch products");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAdd(productId) {
    setLoading(true);
    await addToCart(productId, 1);
    setLoading(false);
    alert("✅ Added to cart!");
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="home-container" style={{ padding: "1rem" }}>
      <h1>🛍️ Products</h1>
      {loading && <p>Loading...</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => handleAdd(p.id)} disabled={loading}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
