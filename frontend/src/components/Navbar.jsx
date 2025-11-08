import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background: "#222", color: "#fff", padding: "1rem" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/cart" style={{ color: "#fff" }}>
        Cart
      </Link>
    </nav>
  );
}
