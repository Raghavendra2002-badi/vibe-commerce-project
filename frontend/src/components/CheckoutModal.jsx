import React, { useState } from 'react';

export default function CheckoutModal({ onClose, onSubmit }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Checkout</h3>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} /></label>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <div className="actions">
          <button onClick={()=>onSubmit({ name, email })}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
