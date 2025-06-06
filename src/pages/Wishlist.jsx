import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/wishlist")
      .then((res) => res.json())
      .then((data) => setWishlist(data))
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, []);

  const removeFromWishlist = (id) => {
    fetch("http://localhost:5000/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-2">
          {wishlist.map((item) => (
            <li key={item.id} className="border p-3 rounded shadow">
              {item.name} – ${item.price}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="ml-4 text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
