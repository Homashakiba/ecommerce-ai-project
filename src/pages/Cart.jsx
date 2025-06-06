import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="mt-2">Your cart is currently empty.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {cartItems.map((item, index) => (
            <li key={index} className="border p-3 rounded shadow">
              {item.name} – ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
