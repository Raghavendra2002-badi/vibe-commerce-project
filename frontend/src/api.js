// frontend/src/api.js
const API_URL = "http://localhost:5000";

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (err) {
    console.error("fetchProducts error:", err);
    return { ok: false };
  }
}

export async function fetchCart() {
  try {
    const res = await fetch(`${API_URL}/api/cart`);
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (err) {
    console.error("fetchCart error:", err);
    return { ok: false };
  }
}

export async function addToCart(productId, qty) {
  return fetch(`${API_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  }).then((r) => r.json());
}

export async function removeCart(id) {
  return fetch(`${API_URL}/api/cart/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());
}

export async function updateCartQty(id, qty) {
  return fetch(`${API_URL}/api/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty }),
  }).then((r) => r.json());
}
