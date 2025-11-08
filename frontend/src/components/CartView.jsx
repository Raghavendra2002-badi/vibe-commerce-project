import React from 'react';

export default function CartView({ items=[], total=0, onRemove, onQtyChange, onCheckout }){
  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? <div>No items</div> : (
        <div>
          {items.map(it => (
            <div key={it.cartId} className="cart-item">
              <div className="name">{it.name}</div>
              <div className="controls">
                <button onClick={()=>onQtyChange(it.cartId, Math.max(1, it.qty-1))}>-</button>
                <span>{it.qty}</span>
                <button onClick={()=>onQtyChange(it.cartId, it.qty+1)}>+</button>
                <button onClick={()=>onRemove(it.cartId)}>Remove</button>
              </div>
              <div className="item-price">₹{it.price * it.qty}</div>
            </div>
          ))}
          <div className="total">Total: ₹{total}</div>
          <button onClick={onCheckout}>Checkout</button>
        </div>
      )}
    </aside>
  );
}
