import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductsGrid({ products = [] }) {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="products">
      <h2>Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <div className="title">{p.name}</div>
            <div className="desc">{p.description || "No description"}</div>
            <div className="price">₹{p.price}</div>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
