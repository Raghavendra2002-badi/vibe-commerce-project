// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            {/* optional fallback route */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                  <h2>404 — Page Not Found</h2>
                </div>
              }
            />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
